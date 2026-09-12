import {
  generateStructuredResponse,
} from "./grokClient.js";

import {
  gameScenarioSchema,
  gameScenarioJsonSchema,
} from "./schemas/aiSchemas.js";

import {
  SCENARIO_SYSTEM_PROMPT,
  buildScenarioUserPrompt,
} from "./prompts/scenarioPrompt.js";

export async function generateScenario({
  profile,
  gameState,
  decisionHistory = [],
  memories = [],
  timeline = [],
}) {
  if (!profile) {
    throw new Error("Player profile is required.");
  }

  if (!gameState) {
    throw new Error("Game state is required.");
  }

  const userPrompt = buildScenarioUserPrompt({
    profile,
    gameState,
    decisionHistory,
    memories,
    timeline,
  });

  const rawResponse = await generateStructuredResponse({
    systemPrompt: SCENARIO_SYSTEM_PROMPT,
    userPrompt,
    responseFormat: {
      name: "game_scenario",
      schema: gameScenarioJsonSchema,
    },
    temperature: 0.5,
  });

  const result = gameScenarioSchema.safeParse(rawResponse);

  if (!result.success) {
    throw new Error(
      `Invalid game scenario returned by AI: ${result.error.message}`
    );
  }

  return result.data;
}