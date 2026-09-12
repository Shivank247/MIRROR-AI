import {
  buildAIContext,
  buildAIContextText,
} from "./aiContextService.js";

const testInput = {
  profile: {
    goals: [
      "financial independence",
      "build an independent career",
    ],
    interests: [
      "technology",
      "AI",
    ],
    priorities: [
      "family",
      "independence",
    ],
    preferences: {
      riskTolerance: "medium-high",
      careerGrowth: "high",
      familyImportance: "high",
    },
  },

  gameState: {
    age: 22,
    career: 55,
    money: 40,
    familyTime: 70,
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
      type: "EVENT",
      summary:
        "Player invested time in learning AI.",
      importance: 0.7,
      age: 22,
      tags: [
        "AI",
        "career",
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
      timestamp: "2026-09-12T18:00:00.000Z",
    },

    {
      id: "decision-002",
      choiceId: "C",
      choiceText:
        "Negotiate a flexible arrangement",
      interpretation:
        "Player attempted to balance career growth with family time.",
      timestamp: "2026-09-12T19:00:00.000Z",
    },
  ],

  timeline: [
    {
      age: 22,
      event:
        "Started exploring startup opportunities",
    },
  ],
};

try {
  console.log("");
  console.log("========================================");
  console.log("       MIRROR//AI MEMORY CONTEXT");
  console.log("========================================");
  console.log("");

  const context = buildAIContext(testInput);

  console.log("AI CONTEXT:");
  console.log(buildAIContextText(context));

  console.log("");
  console.log("========================================");
  console.log("       MEMORY CONTEXT TEST PASSED");
  console.log("========================================");
  console.log("");
} catch (error) {
  console.error("");
  console.error("MEMORY CONTEXT TEST FAILED");
  console.error(error?.message || error);
  console.error("");

  if (error?.stack) {
    console.error(error.stack);
  }

  process.exitCode = 1;
}