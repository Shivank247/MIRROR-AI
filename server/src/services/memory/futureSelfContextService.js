import { buildAIContext } from "./aiContextService.js";

/**
 * Build the reliable context package that can be consumed
 * by the Future Self system.
 *
 * Shivani owns the context preparation.
 * Future Self reasoning remains with Suraj.
 */
export function buildFutureSelfContext(input = {}) {
  const context = buildAIContext(input);

  return {
    playerProfile: context.playerProfile,

    memories: context.importantMemories,

    decisionHistory: context.decisionHistory,

    timeline: context.timeline,

    gameState: context.currentGameState,

    adaptiveSignals: context.adaptiveSignals,

    trajectory: buildTrajectorySummary({
      memories: context.importantMemories,
      decisionHistory: context.decisionHistory,
      timeline: context.timeline,
    }),

    responsibleAI: {
      isSimulation: true,

      statement:
        "This context describes simulated gameplay history. It is not a prediction of the player's real future.",
    },
  };
}

function buildTrajectorySummary({
  memories,
  decisionHistory,
  timeline,
}) {
  const importantMemoryThemes = [];

  for (const memory of memories) {
    if (
      Array.isArray(memory.tags)
    ) {
      for (const tag of memory.tags) {
        if (
          typeof tag === "string" &&
          tag.trim()
        ) {
          importantMemoryThemes.push(
            tag.trim().toLowerCase()
          );
        }
      }
    }
  }

  const uniqueThemes = [
    ...new Set(importantMemoryThemes),
  ];

  const recentDecisions =
    decisionHistory.slice(-5);

  const recentEvents =
    timeline.slice(-5);

  return {
    importantThemes: uniqueThemes,

    decisionCount:
      decisionHistory.length,

    recentDecisions,

    recentEvents,

    memoryCount:
      memories.length,
  };
}

/**
 * Return a JSON-safe version suitable for
 * passing to another service.
 */
export function serializeFutureSelfContext(
  input = {}
) {
  const context =
    buildFutureSelfContext(input);

  return JSON.stringify(
    context,
    null,
    2
  );
}