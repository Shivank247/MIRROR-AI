import {
  storeMemory,
  getPlayerMemories,
  getMemoriesByType,
  getImportantMemories,
  buildMemoryContext,
} from "./memoryService.js";

const PLAYER_ID = "test-player-001";

console.log("\n======================================");
console.log("       MIRROR//AI MEMORY TEST");
console.log("======================================\n");

try {
  console.log("1. Storing player value...");

  await storeMemory({
    playerId: PLAYER_ID,
    type: "value",
    content: "Family is important to the player.",
    source: "player",
    importance: "high",
  });

  console.log("✅ Value stored");

  console.log("\n2. Storing player priority...");

  await storeMemory({
    playerId: PLAYER_ID,
    type: "priority",
    content: "Career growth and financial independence.",
    source: "player",
    importance: "high",
  });

  console.log("✅ Priority stored");

  console.log("\n3. Storing player decision...");

  await storeMemory({
    playerId: PLAYER_ID,
    type: "decision",
    content:
      "The player chose the AI startup opportunity over the stable job.",
    source: "decision-ai",
    importance: "high",
    metadata: {
      scenario: "The Startup Opportunity",
      choiceId: "startup",
    },
  });

  console.log("✅ Decision stored");

  console.log("\n4. Storing decision reasoning...");

  await storeMemory({
    playerId: PLAYER_ID,
    type: "reasoning",
    content:
      "The player prioritized career growth while considering financial risk and personal responsibilities.",
    source: "decision-ai",
    importance: "high",
  });

  console.log("✅ Reasoning stored");

  console.log("\n5. Retrieving all memories...");

  const allMemories =
    await getPlayerMemories(PLAYER_ID);

  console.log(
    JSON.stringify(allMemories, null, 2)
  );

  console.log("\n6. Retrieving decisions...");

  const decisions =
    await getMemoriesByType({
      playerId: PLAYER_ID,
      type: "decision",
    });

  console.log(
    JSON.stringify(decisions, null, 2)
  );

  console.log("\n7. Retrieving important memories...");

  const important =
    await getImportantMemories(PLAYER_ID);

  console.log(
    JSON.stringify(important, null, 2)
  );

  console.log("\n8. Building AI memory context...");

  const context =
    await buildMemoryContext(PLAYER_ID);

  console.log(context);

  console.log("\n======================================");
  console.log("          MEMORY TEST PASSED");
  console.log("======================================\n");
} catch (error) {
  console.error("\n❌ MEMORY TEST FAILED\n");
  console.error(error?.message || error);

  if (error?.stack) {
    console.error("\nStack:");
    console.error(error.stack);
  }

  process.exitCode = 1;
}