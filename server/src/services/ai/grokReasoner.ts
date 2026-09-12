import "dotenv/config";

import type {
  FutureSelf,
  FutureSelfInput,
} from "../../../../shared/types/futureSelf";

import { buildFutureSelfReasoningPrompt } from "../future-self/futureSelfPrompt";

const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`${name} is not configured.`);
  }

  return value.trim();
}

function extractJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error(
        "Groq did not return a valid JSON object.",
      );
    }

    const jsonText = cleaned.slice(start, end + 1);

    try {
      return JSON.parse(jsonText);
    } catch {
      throw new Error(
        "Groq returned malformed JSON.",
      );
    }
  }
}

function normalizeFutureSelf(value: unknown): FutureSelf {
  if (!value || typeof value !== "object") {
    throw new Error(
      "Groq returned an invalid Future Self object.",
    );
  }

  const raw = value as Record<string, unknown>;

  const personality =
    raw.personality &&
    typeof raw.personality === "object"
      ? (raw.personality as Record<string, unknown>)
      : {};

  const skills = Array.isArray(raw.skills)
    ? raw.skills.map(String)
    : [];

  const achievements = Array.isArray(raw.achievements)
    ? raw.achievements.map(String)
    : [];

  const regrets = Array.isArray(raw.regrets)
    ? raw.regrets.map(String)
    : [];

  const majorDecisions = Array.isArray(raw.majorDecisions)
    ? raw.majorDecisions.map(String)
    : [];

  const normalized: FutureSelf = {
    age:
      typeof raw.age === "number"
        ? raw.age
        : 35,

    career:
      typeof raw.career === "string"
        ? raw.career
        : "A career shaped by your simulated decisions",

    financialState:
      typeof raw.financialState === "string"
        ? raw.financialState
        : "Financially stable within this simulated trajectory",

    relationships:
      typeof raw.relationships === "string"
        ? raw.relationships
        : "Relationships shaped by the priorities shown in the simulation",

    skills,

    lifestyle:
      typeof raw.lifestyle === "string"
        ? raw.lifestyle
        : "A lifestyle influenced by the choices made in the simulation",

    achievements,

    regrets,

    personality: {
      confidence:
        typeof personality.confidence === "number"
          ? personality.confidence
          : 50,

      riskTolerance:
        typeof personality.riskTolerance === "number"
          ? personality.riskTolerance
          : 50,

      discipline:
        typeof personality.discipline === "number"
          ? personality.discipline
          : 50,
    },

    majorDecisions,

    trajectorySummary:
      typeof raw.trajectorySummary === "string"
        ? raw.trajectorySummary
        : "A simulated trajectory created from the player's gameplay decisions.",
  };

  if (raw.futureVoice && typeof raw.futureVoice === "object") {
    const voice = raw.futureVoice as Record<
      string,
      unknown
    >;

    normalized.futureVoice = {
      tone:
        typeof voice.tone === "string"
          ? voice.tone
          : "reflective",

      style:
        typeof voice.style === "string"
          ? voice.style
          : "personal and grounded",
    };
  }

  return normalized;
}

export async function grokFutureSelfReasoner(
  input: FutureSelfInput,
): Promise<FutureSelf> {
  const apiKey = getRequiredEnv("GROQ_API_KEY");

  const model =
    process.env.GROQ_MODEL ||
    "llama-3.3-70b-versatile";

  const prompt =
    buildFutureSelfReasoningPrompt(input);

  const response = await fetch(GROQ_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },

    body: JSON.stringify({
      model,

      temperature: 0.7,

      max_tokens: 2000,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: `
You are the Future Self reasoning engine for MIRROR//AI.

Your job is to generate a believable SIMULATED Future Self
from the player's actual gameplay data.

This is NOT a real prediction.

Return ONLY one JSON object.

The JSON object MUST contain exactly these required fields:

{
  "age": number,
  "career": string,
  "financialState": string,
  "relationships": string,
  "skills": string[],
  "lifestyle": string,
  "achievements": string[],
  "regrets": string[],
  "personality": {
    "confidence": number,
    "riskTolerance": number,
    "discipline": number
  },
  "majorDecisions": string[],
  "trajectorySummary": string
}

You MAY additionally include:

"futureVoice": {
  "tone": string,
  "style": string
}

Rules:

- Ground everything in the supplied gameplay data.
- Use the player's decisions as causal factors.
- Consider current stats.
- Consider goals and interests.
- Consider memories and timeline events when available.
- Do not invent unrelated major events.
- Do not diagnose the player.
- Do not claim this is their real future.
- Do not claim outcomes are guaranteed.
- Personality values must be numbers from 0 to 100.
- Age must be greater than the current player age.
- skills must be a JSON array of strings.
- achievements must be a JSON array of strings.
- regrets must be a JSON array of strings.
- majorDecisions must be a JSON array of strings.
- trajectorySummary must be a non-empty string.
- All textual content should feel personalized to this gameplay.
- Return valid JSON only.
`.trim(),
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
      `Groq request failed (${response.status}): ${errorText}`,
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

  if (!content) {
    throw new Error(
      "Groq returned an empty Future Self response.",
    );
  }

  const parsed = extractJson(content);

  console.log(
    "GROQ FUTURE SELF RESPONSE:",
    JSON.stringify(parsed, null, 2),
  );

  return normalizeFutureSelf(parsed);
}