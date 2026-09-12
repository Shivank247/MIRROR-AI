import {
  generateAdaptiveScenario,
} from "./adaptiveScenarioService.js";

const playerInput = {
  profile: {
    goals: [
      "financial independence",
      "build an independent career",
    ],

    priorities: [
      "family",
      "independence",
    ],

    interests: [
      "technology",
      "AI",
    ],

    aspirations: [
      "build a startup",
    ],

    riskTolerance: "medium-high",

    summary:
      "The player wants financial independence while protecting family relationships and building a technology-focused career.",
  },

  gameState: {
    age: 22,
    career: 55,
    money: 40,
    familyTime: 70,
    stress: 25,
    risk: 40,
  },

  memories: [
    {
      type: "DECISION",
      summary:
        "Player accepted a risky opportunity to pursue independence.",
      importance: 0.9,
      age: 22,
      tags: [
        "independence",
        "risk",
        "career",
      ],
    },

    {
      type: "PREFERENCE",
      summary:
        "Player wants to protect family time while growing their career.",
      importance: 0.8,
      age: 22,
      tags: [
        "family",
        "career",
      ],
    },

    {
      type: "GOAL",
      summary:
        "Player wants to achieve financial independence.",
      importance: 0.8,
      age: 22,
      tags: [
        "money",
        "independence",
      ],
    },
  ],

  decisionHistory: [
    {
      id: "decision-001",
      choiceId: "A",
      choiceText: "Join the startup",
      interpretation:
        "Player accepted a high-risk career opportunity.",
      timestamp:
        "2026-09-12T18:00:00.000Z",
    },

    {
      id: "decision-002",
      choiceId: "C",
      choiceText:
        "Negotiate a flexible arrangement",
      interpretation:
        "Player attempted to balance career growth with family time.",
      timestamp:
        "2026-09-12T19:00:00.000Z",
    },
  ],

  timeline: [
    {
      age: 22,
      event:
        "Started exploring startup opportunities.",
    },
  ],
};

try {
  console.log("");
  console.log("========================================");
  console.log("     MIRROR//AI ADAPTIVE SCENARIO");
  console.log("========================================");
  console.log("");

  console.log("Generating personalized scenario...");
  console.log("");

  const scenario =
    await generateAdaptiveScenario(playerInput);

  console.log(
    JSON.stringify(scenario, null, 2)
  );

  console.log("");
  console.log("========================================");
  console.log("   ADAPTIVE SCENARIO TEST PASSED");
  console.log("========================================");
  console.log("");
} catch (error) {
  console.error("");
  console.error(
    "❌ ADAPTIVE SCENARIO TEST FAILED"
  );
  console.error(
    error?.message || error
  );
  console.error("");

  if (error?.stack) {
    console.error(error.stack);
  }

  process.exitCode = 1;
}