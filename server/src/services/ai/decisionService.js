import { z } from "zod";

import {
  generateStructuredResponse,
} from "./grokClient.js";

import {
  DECISION_SYSTEM_PROMPT,
  buildDecisionUserPrompt,
} from "./prompts/decisionPrompt.js";

/*
 * Decision interpretation is an AI-internal result.
 * It is intentionally not a replacement for the shared GameDecision type.
 * The Game Engine remains responsible for actual game-state changes.
 */

const decisionInterpretationSchema = z.object({
  meaning: z.string(),

  reinforcedPriorities: z.array(z.string()),

  reinforcedGoals: z.array(z.string()),

  preferenceSignals: z.array(z.string()),

  turningPoint: z.boolean(),

  summary: z.string(),
});

const decisionInterpretationJsonSchema = {
  type: "object",
  additionalProperties: false,

  properties: {
    meaning: {
      type: "string",
    },

    reinforcedPriorities: {
      type: "array",
      items: {
        type: "string",
      },
    },

    reinforcedGoals: {
      type: "array",
      items: {
        type: "string",
      },
    },

    preferenceSignals: {
      type: "array",
      items: {
        type: "string",
      },
    },

    turningPoint: {
      type: "boolean",
    },

    summary: {
      type: "string",
    },
  },

  required: [
    "meaning",
    "reinforcedPriorities",
    "reinforcedGoals",
    "preferenceSignals",
    "turningPoint",
    "summary",
  ],
};

export async function interpretDecision({
  profile,
  scenario,
  selectedChoice,
  gameState,
  decisionHistory = [],
  memories = [],
}) {
  if (!profile) {
    throw new Error("Player profile is required.");
  }

  if (!scenario) {
    throw new Error("Scenario is required.");
  }

  if (!selectedChoice) {
    throw new Error("Selected choice is required.");
  }

  if (!gameState) {
    throw new Error("Game state is required.");
  }

  const userPrompt = buildDecisionUserPrompt({
    profile,
    scenario,
    selectedChoice,
    gameState,
    decisionHistory,
    memories,
  });

  const rawResponse = await generateStructuredResponse({
    systemPrompt: DECISION_SYSTEM_PROMPT,
    userPrompt,
    responseFormat: {
      name: "decision_interpretation",
      schema: decisionInterpretationJsonSchema,
    },
    temperature: 0.3,
  });

  const result = decisionInterpretationSchema.safeParse(rawResponse);

  if (!result.success) {
    throw new Error(
      `Invalid decision interpretation returned by AI: ${result.error.message}`
    );
  }

  return result.data;
}