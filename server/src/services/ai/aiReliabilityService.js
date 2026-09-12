import { generateAdaptiveScenario } from "./adaptiveScenarioService.js";

const FALLBACK_SCENARIO = {
  scenarioId: "fallback_scenario_001",

  title: "A Difficult Choice",

  description:
    "You are facing an important decision that could affect your future.",

  context:
    "The situation requires you to balance your goals, responsibilities, and personal priorities.",

  reasonForScenario:
    "This scenario is provided safely because personalized AI generation is temporarily unavailable.",

  choices: [
    {
      id: "A",
      text: "Choose the safer and more stable option.",
      rationale:
        "This option reduces immediate uncertainty and protects stability.",
      effects: {
        career: 1,
        money: 1,
        familyTime: 2,
        stress: -2,
        risk: -3,
      },
    },
    {
      id: "B",
      text: "Take the more ambitious opportunity.",
      rationale:
        "This option creates more uncertainty but may provide greater long-term growth.",
      effects: {
        career: 3,
        money: 2,
        familyTime: -1,
        stress: 2,
        risk: 3,
      },
    },
  ],
};

/**
 * Generate a personalized scenario safely.
 *
 * If AI generation fails, a deterministic fallback
 * scenario is returned instead of crashing the game.
 */
export async function generateReliableScenario(input) {
  try {
    const scenario = await generateAdaptiveScenario(input);

    if (!scenario || typeof scenario !== "object") {
      throw new Error("AI returned an invalid scenario.");
    }

    if (
      !Array.isArray(scenario.choices) ||
      scenario.choices.length < 2
    ) {
      throw new Error("AI returned an invalid choices list.");
    }

    return {
      source: "ai",
      fallbackUsed: false,
      scenario,
    };
  } catch (error) {
    console.warn("");
    console.warn("AI scenario generation failed.");
    console.warn(
      error?.message || "Unknown AI error."
    );
    console.warn("Using safe fallback scenario.");
    console.warn("");

    return {
      source: "fallback",
      fallbackUsed: true,
      scenario: FALLBACK_SCENARIO,
      error: error?.message || "AI generation failed.",
    };
  }
}

export function getFallbackScenario() {
  return FALLBACK_SCENARIO;
}