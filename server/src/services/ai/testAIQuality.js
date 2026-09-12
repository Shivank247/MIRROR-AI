import { generateAdaptiveScenario } from "./adaptiveScenarioService.js";

const playerProfile = {
  goals: [
    "financial independence",
    "career growth",
  ],

  interests: [
    "technology",
    "AI",
    "entrepreneurship",
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
      "Player previously chose an independent opportunity over a stable option.",
    importance: 0.9,
    tags: ["independence", "career", "risk"],
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
    event: "Started exploring independent career opportunities.",
    time: 1,
  },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function checkStructure(scenario) {
  assert(
    scenario &&
      typeof scenario === "object",
    "Scenario must be an object."
  );

  assert(
    typeof scenario.scenarioId === "string",
    "scenarioId is missing."
  );

  assert(
    typeof scenario.title === "string",
    "title is missing."
  );

  assert(
    typeof scenario.description === "string",
    "description is missing."
  );

  assert(
    typeof scenario.context === "string",
    "context is missing."
  );

  assert(
    typeof scenario.reasonForScenario === "string",
    "reasonForScenario is missing."
  );

  assert(
    Array.isArray(scenario.choices),
    "choices must be an array."
  );

  assert(
    scenario.choices.length >= 2 &&
      scenario.choices.length <= 3,
    "Scenario must contain 2 or 3 choices."
  );

  for (const choice of scenario.choices) {
    assert(
      typeof choice.id === "string",
      "Choice ID is missing."
    );

    assert(
      typeof choice.text === "string",
      `Choice ${choice.id} text is missing.`
    );

    assert(
      typeof choice.rationale === "string",
      `Choice ${choice.id} rationale is missing.`
    );

    assert(
      choice.effects &&
        typeof choice.effects === "object",
      `Choice ${choice.id} effects are missing.`
    );

    const effectKeys = [
      "career",
      "money",
      "familyTime",
      "stress",
      "risk",
    ];

    for (const key of effectKeys) {
      assert(
        typeof choice.effects[key] === "number",
        `${key} effect missing for choice ${choice.id}.`
      );

      assert(
        choice.effects[key] >= -10 &&
          choice.effects[key] <= 10,
        `${key} effect out of allowed range for choice ${choice.id}.`
      );
    }
  }

  return true;
}

function checkTradeOffs(scenario) {
  const choices = scenario.choices;

  const signatures = choices.map((choice) =>
    JSON.stringify(choice.effects)
  );

  const uniqueSignatures =
    new Set(signatures);

  assert(
    uniqueSignatures.size >= 2,
    "Choices do not have meaningful differences."
  );

  return true;
}

function checkPersonalization(scenario) {
  const combinedText = [
    scenario.title,
    scenario.description,
    scenario.context,
    scenario.reasonForScenario,
    ...scenario.choices.map(
      (choice) => choice.text
    ),
  ]
    .join(" ")
    .toLowerCase();

  const personalizationSignals = [
    "family",
    "career",
    "independence",
    "risk",
    "opportunity",
    "technology",
    "business",
    "money",
  ];

  const matchedSignals =
    personalizationSignals.filter((signal) =>
      combinedText.includes(signal)
    );

  console.log(
    `Personalization signals found: ${matchedSignals.join(", ")}`
  );

  assert(
    matchedSignals.length >= 1,
    "Scenario does not appear personalized."
  );

  return true;
}

function checkGameability(scenario) {
  for (const choice of scenario.choices) {
    assert(
      choice.id.trim().length > 0,
      "Choice ID cannot be empty."
    );

    assert(
      choice.text.trim().length > 0,
      "Choice text cannot be empty."
    );

    assert(
      choice.rationale.trim().length > 0,
      "Choice rationale cannot be empty."
    );
  }

  return true;
}

async function runQualityTest() {
  console.log("");
  console.log(
    "=============================================="
  );
  console.log(
    "       MIRROR//AI AI QUALITY TEST"
  );
  console.log(
    "=============================================="
  );
  console.log("");

  console.log("Generating personalized scenario...");
  console.log("");

  const scenario =
    await generateAdaptiveScenario({
      profile: playerProfile,
      memories,
      decisionHistory,
      gameState,
      timeline,
    });

  console.log(
    "Generated Scenario:"
  );

  console.log(
    JSON.stringify(
      scenario,
      null,
      2
    )
  );

  console.log("");
  console.log(
    "Running quality checks..."
  );
  console.log("");

  console.log("1. Structure...");
  checkStructure(scenario);
  console.log("   PASS");

  console.log("2. Personalization...");
  checkPersonalization(scenario);
  console.log("   PASS");

  console.log("3. Meaningful trade-offs...");
  checkTradeOffs(scenario);
  console.log("   PASS");

  console.log("4. Gameability...");
  checkGameability(scenario);
  console.log("   PASS");

  console.log("");
  console.log(
    "=============================================="
  );
  console.log(
    "       AI QUALITY TEST PASSED"
  );
  console.log(
    "=============================================="
  );
  console.log("");
}

try {
  await runQualityTest();
} catch (error) {
  console.log("");
  console.log(
    "=============================================="
  );
  console.log(
    "       AI QUALITY TEST FAILED"
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