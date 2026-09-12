import {
  buildFutureSelfContext,
  serializeFutureSelfContext,
} from "./futureSelfContextService.js";

const testInput = {
  profile: {
    goals: [
      "financial independence",
      "career growth",
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
    },
  },

  gameState: {
    career: 65,
    money: 55,
    familyTime: 68,
    stress: 35,
    risk: 48,
  },

  memories: [
    {
      type: "DECISION",
      summary:
        "Player chose an independent career opportunity over stability.",
      importance: 0.9,
      tags: [
        "independence",
        "career",
        "risk",
      ],
    },

    {
      type: "PREFERENCE",
      summary:
        "Player wants to protect family time.",
      importance: 0.8,
      tags: [
        "family",
        "balance",
      ],
    },
  ],

  decisionHistory: [
    {
      id: "decision-001",
      choiceId: "A",
      choiceText:
        "Choose the independent opportunity.",
      interpretation:
        "Player accepted additional risk for career growth.",
      timestamp:
        "2026-09-12T18:00:00.000Z",
    },
  ],

  timeline: [
    {
      age: 22,
      event:
        "Player started exploring independent career opportunities.",
    },
  ],
};

try {
  console.log("");
  console.log(
    "========================================"
  );
  console.log(
    "    MIRROR//AI FUTURE SELF CONTEXT"
  );
  console.log(
    "========================================"
  );
  console.log("");

  const context =
    buildFutureSelfContext(testInput);

  if (!context.playerProfile) {
    throw new Error(
      "Player profile missing."
    );
  }

  if (!Array.isArray(context.memories)) {
    throw new Error(
      "Memories must be an array."
    );
  }

  if (!Array.isArray(context.decisionHistory)) {
    throw new Error(
      "Decision history must be an array."
    );
  }

  if (!Array.isArray(context.timeline)) {
    throw new Error(
      "Timeline must be an array."
    );
  }

  if (!context.gameState) {
    throw new Error(
      "Game state missing."
    );
  }

  if (!context.trajectory) {
    throw new Error(
      "Trajectory summary missing."
    );
  }

  if (
    context.responsibleAI?.isSimulation !== true
  ) {
    throw new Error(
      "Responsible AI flag missing."
    );
  }

  console.log(
    "Future Self context:"
  );

  console.log(
    serializeFutureSelfContext(testInput)
  );

  console.log("");
  console.log(
    "========================================"
  );
  console.log(
    " FUTURE SELF CONTEXT TEST PASSED"
  );
  console.log(
    "========================================"
  );
  console.log("");
} catch (error) {
  console.log("");
  console.log(
    "========================================"
  );
  console.log(
    " FUTURE SELF CONTEXT TEST FAILED"
  );
  console.log(
    "========================================"
  );
  console.log("");

  console.error(
    error?.message || error
  );

  if (error?.stack) {
    console.error(error.stack);
  }

  process.exitCode = 1;
}