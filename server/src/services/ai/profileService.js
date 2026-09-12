import {
  generateStructuredResponse,
} from "./grokClient.js";

import {
  playerProfileSchema,
  playerProfileJsonSchema,
  normalizePlayerProfile,
} from "./schemas/aiSchemas.js";

import {
  PROFILE_SYSTEM_PROMPT,
  buildProfileUserPrompt,
} from "./prompts/profilePrompt.js";

export async function generatePlayerProfile(inputText) {
  if (typeof inputText !== "string" || !inputText.trim()) {
    throw new Error("Player input is required.");
  }

  const userPrompt = buildProfileUserPrompt(inputText.trim());

  const rawResponse = await generateStructuredResponse({
    systemPrompt: PROFILE_SYSTEM_PROMPT,
    userPrompt,
    responseFormat: {
      name: "player_profile",
      schema: playerProfileJsonSchema,
    },
    temperature: 0.3,
  });

  const normalizedResponse = normalizePlayerProfile(rawResponse);

  const result = playerProfileSchema.safeParse(normalizedResponse);

  if (!result.success) {
    throw new Error(
      `Invalid player profile returned by AI: ${result.error.message}`
    );
  }

  return result.data;
}