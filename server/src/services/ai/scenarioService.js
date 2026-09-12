import { generateStructuredResponse } from "./grokClient.js";

import {
  SCENARIO_SYSTEM_PROMPT,
  buildScenarioUserPrompt,
} from "./prompts/scenarioPrompt.js";

const scenarioJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: {
      type: "string",
    },
    situation: {
      type: "string",
    },
    conflict: {
      type: "string",
    },
    choices: {
      type: "array",
      minItems: 3,
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
          why_it_matters: {
            type: "string",
          },
        },
        required: ["id", "text", "why_it_matters"],
      },
    },
  },
  required: ["title", "situation", "conflict", "choices"],
};

function validateScenario(scenario) {
  if (!scenario || typeof scenario !== "object") {
    throw new Error("AI returned an invalid scenario.");
  }

  if (typeof scenario.title !== "string" || !scenario.title.trim()) {
    throw new Error("Scenario title is missing.");
  }

  if (
    typeof scenario.situation !== "string" ||
    !scenario.situation.trim()
  ) {
    throw new Error("Scenario situation is missing.");
  }

  if (
    typeof scenario.conflict !== "string" ||
    !scenario.conflict.trim()
  ) {
    throw new Error("Scenario conflict is missing.");
  }

  if (!Array.isArray(scenario.choices) || scenario.choices.length !== 3) {
    throw new Error("Scenario must contain exactly 3 choices.");
  }

  for (const choice of scenario.choices) {
    if (
      typeof choice.id !== "string" ||
      typeof choice.text !== "string" ||
      typeof choice.why_it_matters !== "string"
    ) {
      throw new Error("Scenario contains an invalid choice.");
    }
  }

  return scenario;
}

export async function generateScenario(playerProfile) {
  if (!playerProfile || typeof playerProfile !== "object") {
    throw new Error("A valid player profile is required.");
  }

  const userPrompt = buildScenarioUserPrompt(playerProfile);

  const scenario = await generateStructuredResponse({
    systemPrompt: SCENARIO_SYSTEM_PROMPT,
    userPrompt,
    responseFormat: {
      name: "personalized_scenario",
      schema: scenarioJsonSchema,
    },
    temperature: 0.7,
  });

  return validateScenario(scenario);
}