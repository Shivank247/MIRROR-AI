import dotenv from "dotenv";
import { interpretDecision } from "./decisionService.js";

dotenv.config();

const playerProfile = {
  goals: [
    "Build a successful career",
    "Become financially independent",
  ],

  priorities: [
    "Career growth",
    "Financial independence",
    "Family",
  ],

  interests: [
    "AI",
    "Technology",
    "Fitness",
  ],

  aspirations: [
    "Build my own startup",
  ],

  riskTolerance: "moderate",

  summary:
    "A technology-oriented player focused on career growth and financial independence while maintaining important personal priorities.",
};

const scenario = {
  title: "The Startup Opportunity",

  situation:
    "You receive an opportunity to join an early-stage AI startup. " +
    "The role offers strong learning and growth potential but comes with " +
    "less financial security than a stable job.",

  context:
    "You want career growth and financial independence, but you also value " +
    "stability and your personal responsibilities.",

  choices: [
    {
      id: "startup",
      text: "Join the AI startup and accept the financial uncertainty.",
    },
    {
      id: "stable-job",
      text: "Choose a stable job and avoid the additional financial risk.",
    },
    {
      id: "delay",
      text: "Delay the decision and investigate the startup opportunity further.",
    },
  ],
};

const selectedChoice = {
  id: "startup",
  text: "Join the AI startup and accept the financial uncertainty.",
};

const decision =
  "I would take the startup opportunity, but only after checking " +
  "whether I can manage the financial risk and personal responsibilities.";

const gameState = {
  career: 50,
  finances: 50,
  relationships: 50,
  health: 50,
  stress: 30,
};

console.log("\n======================================");
console.log("       MIRROR//AI DECISION TEST");
console.log("======================================\n");

try {
  console.log("Sending decision to AI...\n");

  const result = await interpretDecision({
    profile: playerProfile,
    scenario,
    selectedChoice,
    decision,
    gameState,
  });

  console.log("✅ DECISION AI WORKING\n");
  console.log(JSON.stringify(result, null, 2));

  console.log("\n======================================");
  console.log("           TEST PASSED");
  console.log("======================================\n");
} catch (error) {
  console.error("\n❌ DECISION TEST FAILED\n");
  console.error(error?.message || error);

  if (error?.stack) {
    console.error("\nStack:");
    console.error(error.stack);
  }

  process.exitCode = 1;
}