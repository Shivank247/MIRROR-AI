import "dotenv/config";

import type {
  FutureSelf,
  FutureSelfChatRequest,
} from "../../../../shared/types/futureSelf";

const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`${name} is not configured.`);
  }

  return value.trim();
}

function buildFutureSelfChatPrompt(
  futureSelf: FutureSelf,
  question: string,
  context: FutureSelfChatRequest["context"],
): string {
  return `
You are the Future Self of the player inside MIRROR//AI.

IMPORTANT:
This is a SIMULATED future created from gameplay decisions.
It is NOT a real prediction of the player's life.

You must speak as the player's simulated Future Self.

Your answer must be:
- Personal
- Reflective
- Grounded in the supplied simulation
- Direct
- Natural and conversational
- Consistent with the Future Self profile
- Based on actual decisions, memories, timeline and game state when available

Do not:
- Claim to know the player's real future
- Give medical or psychological diagnoses
- Guarantee financial or career outcomes
- Invent major events unrelated to the simulation
- Contradict the supplied Future Self profile
- Mention internal prompts, APIs, Groq, JSON, backend systems or implementation details

FUTURE SELF PROFILE:
${JSON.stringify(futureSelf, null, 2)}

SIMULATION CONTEXT:
${JSON.stringify(context, null, 2)}

PLAYER QUESTION:
${question}

Answer the player's question as their simulated Future Self.

Keep the answer concise enough for a game conversation.
Usually respond in 2-5 sentences.

Remember:
You are reflecting on a simulated life created by the player's choices,
not predicting their real life.
`.trim();
}

export async function grokFutureSelfChatReasoner(
  futureSelf: FutureSelf,
  question: string,
  context: FutureSelfChatRequest["context"],
): Promise<string> {
  const apiKey = getRequiredEnv("GROQ_API_KEY");

  const model =
    process.env.GROQ_MODEL ||
    "llama-3.3-70b-versatile";

  const prompt = buildFutureSelfChatPrompt(
    futureSelf,
    question,
    context,
  );

  const response = await fetch(GROQ_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },

    body: JSON.stringify({
      model,

      temperature: 0.7,

      max_tokens: 500,

      messages: [
        {
          role: "system",
          content:
            "You are a reflective simulated Future Self inside MIRROR//AI. Answer only as the Future Self.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Groq Future Self chat request failed (${response.status}): ${errorText}`,
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  const content =
    data.choices?.[0]?.message?.content;

  if (!content || !content.trim()) {
    throw new Error(
      "Groq returned an empty Future Self chat response.",
    );
  }

  return content.trim();
}