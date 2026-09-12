import {
  generateReliableScenario,
} from "./aiReliabilityService.js";

const playerProfile = {
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
    riskTolerance: "medium",
  },
};

const memories = [
  {
    type: "PREFERENCE",
    summary: "Player values family time.",
    importance: 0.8,
    tags: ["family", "balance"],
  },

  {
    type: "DECISION",
    summary:
      "Player previously selected an independent career opportunity.",
    importance: 0.9,
    tags: ["career", "independence"],
  },
];

const decisionHistory = [
  {
    scenarioId: "career_choice_01",
    choiceId: "A",
    choiceText:
      "Choose the independent opportunity.",
  },
];

const gameState = {
  career: 60,
  money: 50,
  familyTime: 70,
  stress: 30,
  risk: 45,
};

const timeline = [
  {
    event:
      "Player started exploring independent career opportunities.",
    time: 1,
  },
];

async function runTest() {
  console.log("");
  console.log(
    "=============================================="
  );
  console.log(
    "       MIRROR//AI RELIABILITY TEST"
  );
  console.log(
    "=============================================="
  );
  console.log("");

  console.log(
    "Generating scenario safely..."
  );
  console.log("");

  const result =
    await generateReliableScenario({
      profile: playerProfile,
      memories,
      decisionHistory,
      gameState,
      timeline,
    });

  if (!result) {
    throw new Error(
      "Reliability service returned nothing."
    );
  }

  if (!result.scenario) {
    throw new Error(
      "No scenario was returned."
    );
  }

  if (
    !Array.isArray(result.scenario.choices)
  ) {
    throw new Error(
      "Scenario choices are missing."
    );
  }

  if (
    result.scenario.choices.length < 2
  ) {
    throw new Error(
      "Fallback/AI scenario must contain at least 2 choices."
    );
  }

  console.log(
    "Scenario source:"
  );

  console.log(
    result.source
  );

  console.log("");

  console.log(
    "Fallback used:"
  );

  console.log(
    result.fallbackUsed
  );

  console.log("");

  console.log(
    "Scenario:"
  );

  console.log(
    JSON.stringify(
      result.scenario,
      null,
      2
    )
  );

  console.log("");

  console.log(
    "=============================================="
  );
  console.log(
    "       AI RELIABILITY TEST PASSED"
  );
  console.log(
    "=============================================="
  );
  console.log("");
}

try {
  await runTest();
} catch (error) {
  console.log("");
  console.log(
    "=============================================="
  );
  console.log(
    "       AI RELIABILITY TEST FAILED"
  );
  console.log(
    "=============================================="
  );
  console.log("");

  console.error(
    error?.message || error
  );

  console.log("");
  process.exitCode = 1;
}