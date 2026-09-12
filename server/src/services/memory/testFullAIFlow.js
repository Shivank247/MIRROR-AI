import { generateAdaptiveScenario } from "../ai/adaptiveScenarioService.js";
import { buildFutureSelfContext } from "./futureSelfContextService.js";

const playerProfile = {
  goals: ["financial independence", "build an AI startup"],
  interests: ["technology", "AI"],
  riskTolerance: "moderate",
  values: ["family", "career growth"],
};

const memories = [
  {
    type: "GOAL",
    content: "Player wants financial independence.",
    importance: 0.7,
    tags: ["career", "money"],
  },
  {
    type: "PREFERENCE",
    content: "Player enjoys technology and AI.",
    importance: 0.4,
    tags: ["technology", "AI"],
  },
];

const decisionHistory = [
  {
    scenarioId: "scenario-001",
    choiceId: "choice-a",
    decision: "Choose an AI internship opportunity.",
    timestamp: "Day 1",
  },
];

const gameState = {
  career: 40,
  money: 30,
  familyTime: 60,
  stress: 25,
  risk: 35,
};

async function runTest() {
  console.log("\n=== MIRROR//AI FULL AI FLOW TEST ===\n");

  const input = {
    playerProfile,
    memories,
    decisionHistory,
    gameState,
    timeline: ["Day 1: Started AI journey"],
  };

  console.log("1. Building Future Self context...");

  const futureSelfContext = buildFutureSelfContext(input);

  if (!futureSelfContext.playerProfile) {
    throw new Error("Future Self context is missing player profile.");
  }

  if (!Array.isArray(futureSelfContext.memories)) {
    throw new Error("Future Self context is missing memories.");
  }

  if (!Array.isArray(futureSelfContext.decisionHistory)) {
    throw new Error("Future Self context is missing decision history.");
  }

  console.log("✓ Future Self context valid");

  console.log("\n2. Generating adaptive scenario...");

  const scenario = await generateAdaptiveScenario(input);

  if (!scenario) {
    throw new Error("Adaptive scenario was not generated.");
  }

  if (!scenario.scenarioId) {
    throw new Error("Scenario is missing scenarioId.");
  }

  if (!scenario.title) {
    throw new Error("Scenario is missing title.");
  }

  if (!Array.isArray(scenario.choices) || scenario.choices.length < 2) {
    throw new Error("Scenario must contain at least 2 choices.");
  }

  console.log("✓ Adaptive scenario valid");

  console.log("\n=== FULL AI FLOW PASSED ===");
  console.log("Scenario:", scenario.title);
  console.log("Choices:", scenario.choices.length);
  console.log("Memories:", futureSelfContext.memories.length);
  console.log(
    "Decisions:",
    futureSelfContext.decisionHistory.length
  );
}

runTest().catch((error) => {
  console.error("\n=== FULL AI FLOW FAILED ===");
  console.error(error.message);
  process.exit(1);
});