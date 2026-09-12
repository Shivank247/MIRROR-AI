import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const client =
  apiKey && apiKey !== "YOUR_GROQ_API_KEY_HERE"
    ? new OpenAI({
        apiKey,
        baseURL: "https://api.groq.com/openai/v1",
      })
    : null;

export function isAIConfigured() {
  return Boolean(client);
}

export function getAIModel() {
  return model;
}

export async function generateStructuredResponse({
  systemPrompt,
  userPrompt,
  responseFormat,
  temperature = 0.4,
}) {
  if (!client) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  if (!systemPrompt || !userPrompt) {
    throw new Error("systemPrompt and userPrompt are required.");
  }

  if (!responseFormat?.name || !responseFormat?.schema) {
    throw new Error("A valid response format is required.");
  }

  const response = await client.chat.completions.create({
    model,
    temperature,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: responseFormat.name,
        strict: true,
        schema: responseFormat.schema,
      },
    },
  });

  const content = response.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Groq returned an empty response.");
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Groq returned invalid JSON.");
  }
}