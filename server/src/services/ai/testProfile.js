import { generatePlayerProfile } from "./profileService.js";

const input =
  "I want financial independence, but my family is extremely important to me. " +
  "I am interested in technology and AI. I want to build my own startup " +
  "and I am willing to take calculated risks to achieve it.";

try {
  const profile = await generatePlayerProfile(input);

  console.log("\n===== MIRROR//AI PLAYER PROFILE =====\n");
  console.log(JSON.stringify(profile, null, 2));
  console.log("\n=====================================\n");
} catch (error) {
  console.error("\n❌ Profile generation failed:");
  console.error(error.message);
  process.exitCode = 1;
}