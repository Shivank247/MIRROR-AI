import { z } from "zod";

/* =========================================================
   PLAYER PROFILE
   Matches shared/types/ai.ts
   ========================================================= */

export const playerProfileSchema = z.object({
  goals: z.array(z.string()),
  priorities: z.array(z.string()),
  interests: z.array(z.string()),
  aspirations: z.array(z.string()),
  riskTolerance: z
    .enum(["low", "medium", "high"])
    .optional(),
  summary: z.string(),
});

export const playerProfileJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    goals: {
      type: "array",
      items: {
        type: "string",
      },
    },
    priorities: {
      type: "array",
      items: {
        type: "string",
      },
    },
    interests: {
      type: "array",
      items: {
        type: "string",
      },
    },
    aspirations: {
      type: "array",
      items: {
        type: "string",
      },
    },
    riskTolerance: {
      type: ["string", "null"],
      enum: ["low", "medium", "high", null],
    },
    summary: {
      type: "string",
    },
  },
  required: [
    "goals",
    "priorities",
    "interests",
    "aspirations",
    "riskTolerance",
    "summary",
  ],
};


/* =========================================================
   STAT EFFECTS
   Matches shared/types/game.ts
   ========================================================= */

export const statEffectsSchema = z.object({
  career: z.number().optional(),
  money: z.number().optional(),
  relationships: z.number().optional(),
  knowledge: z.number().optional(),
  creativity: z.number().optional(),
  energy: z.number().optional(),
  stress: z.number().optional(),
});

export const statEffectsJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    career: {
      type: ["number", "null"],
    },
    money: {
      type: ["number", "null"],
    },
    relationships: {
      type: ["number", "null"],
    },
    knowledge: {
      type: ["number", "null"],
    },
    creativity: {
      type: ["number", "null"],
    },
    energy: {
      type: ["number", "null"],
    },
    stress: {
      type: ["number", "null"],
    },
  },
  required: [
    "career",
    "money",
    "relationships",
    "knowledge",
    "creativity",
    "energy",
    "stress",
  ],
};


/* =========================================================
   SCENARIO CHOICE
   Matches shared/types/ai.ts
   ========================================================= */

export const scenarioChoiceSchema = z.object({
  id: z.string(),
  text: z.string(),
  effects: statEffectsSchema,
  timeAdvance: z.number(),
});

export const scenarioChoiceJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
    },
    text: {
      type: "string",
    },
    effects: statEffectsJsonSchema,
    timeAdvance: {
      type: "number",
    },
  },
  required: [
    "id",
    "text",
    "effects",
    "timeAdvance",
  ],
};


/* =========================================================
   GAME SCENARIO
   Matches shared/types/ai.ts
   ========================================================= */

export const gameScenarioSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  context: z.string().optional(),
  choices: z
    .array(scenarioChoiceSchema)
    .min(2)
    .max(4),
  timeAdvance: z.number(),
});

export const gameScenarioJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    context: {
      type: ["string", "null"],
    },
    choices: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: scenarioChoiceJsonSchema,
    },
    timeAdvance: {
      type: "number",
    },
  },
  required: [
    "id",
    "title",
    "description",
    "context",
    "choices",
    "timeAdvance",
  ],
};


/* =========================================================
   NORMALIZATION HELPERS
   Converts strict JSON null values into the optional
   TypeScript contract representation.
   ========================================================= */

export function normalizePlayerProfile(rawProfile) {
  return {
    ...rawProfile,
    ...(rawProfile.riskTolerance === null
      ? { riskTolerance: undefined }
      : {}),
  };
}

export function normalizeGameScenario(rawScenario) {
  return {
    ...rawScenario,
    ...(rawScenario.context === null
      ? { context: undefined }
      : {}),
    choices: rawScenario.choices.map((choice) => ({
      ...choice,
      effects: Object.fromEntries(
        Object.entries(choice.effects).filter(
          ([, value]) => value !== null
        )
      ),
    })),
  };
}