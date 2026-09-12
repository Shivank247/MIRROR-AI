import { interpretDecision } from "./decisionService.js";

const profile = {
  goals: [
    "Achieve financial independence",
    "Build a successful startup",
  ],
  priorities: [
    "Family",
    "Financial independence",
  ],
  interests: [
    "Technology",
    "AI",
  ],
  aspirations: [
    "Become an entrepreneur",
  ],
  riskTolerance: "high",
  summary:
    "The player values family and financial independence and wants to build a technology startup.",
};

const scenario = {
  id: "scenario_family_startup",
  title: "The Family Commitment",
  description:
    "Your startup is entering an important stage, but your family needs your presence for an important event.",
  context:
    "You must decide how to balance your startup ambitions with your family priorities.",
  choices: [
    {
      id: "family",
      text: "Take time away from the startup to support your family.",
      effects: {
        relationships: 8,
        career: -3,
        energy: -2,
      },
      timeAdvance: 1,
    },
    {
      id: "startup",
      text: "Stay focused on the startup and miss the family event.",
      effects: {
        career: 8,
        relationships: -7,
        stress: 4,
      },
      timeAdvance: 1,
    },
  ],
  timeAdvance: 1,
};

const selectedChoice = scenario.choices[0];

const gameState = {
  age: 20,
  year: 1,
  stats: {
    career: 50,
    money: 50,
    relationships: 50,
    knowledge: 50,
    creativity: 50,
    energy: 70,
    stress: 20,
  },
  xp: 0,
  decisions: [],
  timeline: [],
  memories: [],
};

try {
  const interpretation = await interpretDecision({
    profile,
    scenario,
    selectedChoice,
    gameState,
    decisionHistory: [],
    memories: [],
  });

  console.log("\n===== MIRROR//AI DECISION INTERPRETATION =====\n");
  console.log(JSON.stringify(interpretation, null, 2));
  console.log("\n==============================================\n");
} catch (error) {
  console.error("\n❌ Decision interpretation failed:");
  console.error(error.message);
  process.exitCode = 1;
}