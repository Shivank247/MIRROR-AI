import { generatePlayerProfile } from "./profileService.js";
import { generateScenario } from "./scenarioService.js";

const playerInput =
  "I want financial independence, but my family is extremely important to me. " +
  "I am interested in technology and AI. I want to build my own startup " +
  "and I am willing to take calculated risks to achieve it.";

try {
  console.log("\nGenerating player profile...\n");

  const profile = await generatePlayerProfile(playerInput);

  console.log("PLAYER PROFILE:");
  console.log(JSON.stringify(profile, null, 2));

  console.log("\nGenerating personalized scenario...\n");

  const scenario = await generateScenario(profile);

  console.log("\n===== MIRROR//AI PERSONALIZED SCENARIO =====\n");
  console.log(JSON.stringify(scenario, null, 2));
  console.log("\n=============================================\n");
} catch (error) {
  console.error("\n❌ Scenario generation failed:");
  console.error(error.message);
  process.exitCode = 1;
}