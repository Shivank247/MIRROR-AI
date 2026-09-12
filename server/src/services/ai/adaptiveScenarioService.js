import { generateStructuredResponse } from "./grokClient.js";
import { buildAIContext } from "../memory/aiContextService.js";

const scenarioJsonSchema = {
  type: "object",
  additionalProperties: false,

  properties: {
    scenarioId: {
      type: "string",
    },

    title: {
      type: "string",
    },

    timeAdvance: {
      type: "integer",
      minimum: 0,
    },

    description: {
      type: "string",
    },

    context: {
      type: "string",
    },

    reasonForScenario: {
      type: "string",
    },

    choices: {
      type: "array",
      minItems: 2,
      maxItems: 3,

      items: {
        type: "object",
        additionalProperties: false,

        properties: {
          id: {
            type: "string",
          },

          text: {
            type: "string",
          },

          rationale: {
            type: "string",
          },

          effects: {
            type: "object",
            additionalProperties: false,

            properties: {
              career: {
                type: "integer",
              },

              money: {
                type: "integer",
              },

              familyTime: {
                type: "integer",
              },

              stress: {
                type: "integer",
              },

              risk: {
                type: "integer",
              },
            },

            required: [
              "career",
              "money",
              "familyTime",
              "stress",
              "risk",
            ],
          },
        },

        required: [
          "id",
          "text",
          "rationale",
          "effects",
        ],
      },
    },
  },

  required: [
    "scenarioId",
    "title",
    "timeAdvance",
    "description",
    "context",
    "reasonForScenario",
    "choices",
  ],
};

const SCENARIO_SYSTEM_PROMPT = `
You are the Adaptive Scenario Intelligence module of MIRROR//AI.

MIRROR//AI is a playable life simulation.

Your job is to create a personalized scenario using:

- player profile
- player goals
- player priorities
- player interests
- previous decisions
- important memories
- recent events
- current game state
- player trajectory

IMPORTANT RULES:

1. Never generate a completely random scenario.

2. Every scenario must have a reason for existing.

3. Use the supplied player context.

4. The scenario should feel connected to the player's journey.

5. Generate 2 or 3 meaningful choices.

6. Choices must contain genuine trade-offs.

7. Do not make one choice obviously correct.

8. Do not invent facts about the player.

9. Do not claim to predict the player's real future.

10. This is a simulation for gameplay and reflection.

11. Effects are intended effects only.

12. Never directly modify game state.

13. Never access or modify the database.

14. Keep effects between -10 and +10.

15. Return only valid JSON matching the schema.
`;

function buildScenarioUserPrompt(context) {
  return `
Create the next personalized MIRROR//AI scenario.

PLAYER CONTEXT:

${JSON.stringify(context, null, 2)}

The scenario must:

- use the player's goals
- use the player's priorities
- consider important memories
- consider previous decisions
- consider recent events
- consider current game state
- fit the player's trajectory
- create meaningful trade-offs
- avoid repeating previous scenarios

Each choice must have:

- id
- player-facing text
- rationale
- intended effects

Effects:

career
money
familyTime
stress
risk

These are intended effects for the deterministic game engine.

Do NOT modify actual game state.

Return only JSON.
`;
}

/**
 * Validate AI scenario.
 */
function validateScenario(scenario) {
  if (!scenario || typeof scenario !== "object") {
    throw new Error("AI returned an invalid scenario.");
  }

  if (
    typeof scenario.scenarioId !== "string" ||
    !scenario.scenarioId.trim()
  ) {
    throw new Error("Scenario ID is missing.");
  }

  if (
    typeof scenario.title !== "string" ||
    !scenario.title.trim()
  ) {
    throw new Error("Scenario title is missing.");
  }

  if (
    typeof scenario.description !== "string" ||
    !scenario.description.trim()
  ) {
    throw new Error("Scenario description is missing.");
  }

  if (
    !Array.isArray(scenario.choices) ||
    scenario.choices.length < 2
  ) {
    throw new Error(
      "Scenario must contain at least two choices."
    );
  }

  const effectKeys = [
    "career",
    "money",
    "familyTime",
    "stress",
    "risk",
  ];

  for (const choice of scenario.choices) {
    if (
      !choice ||
      typeof choice.id !== "string" ||
      typeof choice.text !== "string" ||
      typeof choice.rationale !== "string"
    ) {
      throw new Error(
        "Scenario choice is missing required fields."
      );
    }

    if (
      !choice.effects ||
      typeof choice.effects !== "object"
    ) {
      throw new Error(
        `Effects missing for choice ${choice.id}.`
      );
    }

    for (const key of effectKeys) {
      const value = choice.effects[key];

      if (
        typeof value !== "number" ||
        !Number.isInteger(value) ||
        value < -10 ||
        value > 10
      ) {
        throw new Error(
          `Invalid ${key} effect for choice ${choice.id}.`
        );
      }
    }
  }

  return true;
}

/**
 * Deterministic fallback scenario.
 *
 * This allows the game to continue even when
 * Groq is unavailable or returns invalid output.
 */
function createFallbackScenario() {
  return {
    scenarioId: "fallback_personal_decision_01",

    title: "A Choice About Your Next Step",

    timeAdvance: 1,

    description:
      "An unexpected opportunity appears. You must decide how much time, energy, and risk you are willing to invest.",

    context:
      "Your recent journey has created a situation where balancing progress, stability, and personal priorities matters.",

    reasonForScenario:
      "Fallback scenario used because personalized AI generation was temporarily unavailable.",

    choices: [
      {
        id: "A",

        text:
          "Take the opportunity and accept greater risk.",

        rationale:
          "This prioritizes growth and opportunity while accepting additional pressure and uncertainty.",

        effects: {
          career: 6,
          money: 4,
          familyTime: -4,
          stress: 4,
          risk: 6,
        },
      },

      {
        id: "B",

        text:
          "Stay with the safer and more stable option.",

        rationale:
          "This protects stability and reduces pressure but may slow future growth.",

        effects: {
          career: 2,
          money: 3,
          familyTime: 5,
          stress: -3,
          risk: -5,
        },
      },

      {
        id: "C",

        text:
          "Negotiate a balanced option before deciding.",

        rationale:
          "This attempts to preserve progress while reducing the personal cost of the decision.",

        effects: {
          career: 4,
          money: 3,
          familyTime: 3,
          stress: 0,
          risk: 1,
        },
      },
    ],
  };
}

/**
 * Generate personalized scenario.
 *
 * Flow:
 *
 * AI Context
 *     ↓
 * Groq
 *     ↓
 * Validation
 *     ↓
 * Retry once if needed
 *     ↓
 * Fallback if still unavailable
 */
export async function generateAdaptiveScenario(input = {}) {
  let context;

  try {
    context = buildAIContext(input);
  } catch (error) {
    console.warn(
      "AI context creation failed. Using fallback scenario."
    );

    return createFallbackScenario();
  }

  try {
    if (
      !context?.adaptiveSignals?.personalizationAvailable
    ) {
      console.warn(
        "Personalization context unavailable. Using fallback scenario."
      );

      return createFallbackScenario();
    }
  } catch {
    return createFallbackScenario();
  }

  let lastError = null;

  // Attempt 1
  try {
    const result = await generateStructuredResponse({
      systemPrompt: SCENARIO_SYSTEM_PROMPT,

      userPrompt: buildScenarioUserPrompt(context),

      responseFormat: {
        name: "adaptive_scenario",
        schema: scenarioJsonSchema,
      },

      temperature: 0.5,
    });

    validateScenario(result);

    return result;
  } catch (error) {
    lastError = error;

    console.warn(
      "Adaptive scenario AI attempt 1 failed."
    );
    console.warn(
      error?.message || error
    );
  }

  // Attempt 2
  try {
    const retryPrompt = `
The previous scenario generation attempt failed.

Generate a valid MIRROR//AI scenario again.

IMPORTANT:

- Return valid JSON only.
- Follow the required schema exactly.
- Generate 2 or 3 choices.
- Include all required effects.
- Keep effects between -10 and +10.
- Use the supplied player context.
- Do not invent player information.

PLAYER CONTEXT:

${JSON.stringify(context, null, 2)}
`;

    const result = await generateStructuredResponse({
      systemPrompt: SCENARIO_SYSTEM_PROMPT,

      userPrompt: retryPrompt,

      responseFormat: {
        name: "adaptive_scenario",
        schema: scenarioJsonSchema,
      },

      temperature: 0.3,
    });

    validateScenario(result);

    console.log(
      "Adaptive scenario generated successfully on retry."
    );

    return result;
  } catch (error) {
    lastError = error;

    console.warn(
      "Adaptive scenario AI attempt 2 failed."
    );
    console.warn(
      error?.message || error
    );
  }

  // Final fallback
  console.warn(
    "AI unavailable. Returning deterministic fallback scenario."
  );

  if (lastError) {
    console.warn(
      `Last AI error: ${lastError.message || lastError}`
    );
  }

  return createFallbackScenario();
}

export {
  createFallbackScenario,
  validateScenario,
};