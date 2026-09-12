/**
 * MIRROR//AI
 * AI Memory Context Service
 *
 * Responsibility:
 * - Combine player profile
 * - Important memories
 * - Decision history
 * - Current game state
 * - Timeline
 *
 * This service DOES NOT:
 * - mutate game state
 * - write directly to database
 * - call the AI API
 *
 * It only prepares reliable context for AI services.
 */

function cleanArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item) => item !== null && item !== undefined);
}

function cleanObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value;
}

function normalizeMemory(memory) {
  const item = cleanObject(memory);

  return {
    type:
      typeof item.type === "string"
        ? item.type
        : "EVENT",

    summary:
      typeof item.summary === "string"
        ? item.summary
        : "",

    importance:
      typeof item.importance === "number"
        ? Math.max(0, Math.min(1, item.importance))
        : 0.5,

    age:
      typeof item.age === "number"
        ? item.age
        : null,

    tags: cleanArray(item.tags).filter(
      (tag) => typeof tag === "string"
    ),
  };
}

function normalizeDecision(decision) {
  const item = cleanObject(decision);

  return {
    id:
      typeof item.id === "string"
        ? item.id
        : null,

    choiceId:
      typeof item.choiceId === "string"
        ? item.choiceId
        : null,

    choiceText:
      typeof item.choiceText === "string"
        ? item.choiceText
        : typeof item.text === "string"
          ? item.text
          : "",

    interpretation:
      typeof item.interpretation === "string"
        ? item.interpretation
        : "",

    timestamp:
      typeof item.timestamp === "string"
        ? item.timestamp
        : null,
  };
}

/**
 * Build reliable context for adaptive AI.
 *
 * @param {Object} input
 * @returns {Object}
 */
export function buildAIContext(input = {}) {
  const profile = cleanObject(input.profile);
  const gameState = cleanObject(input.gameState);
  const timeline = cleanArray(input.timeline);

  const memories = cleanArray(input.memories)
    .map(normalizeMemory)
    .filter((memory) => memory.summary.length > 0)
    .sort((a, b) => b.importance - a.importance);

  const decisionHistory = cleanArray(input.decisionHistory)
    .map(normalizeDecision)
    .filter(
      (decision) =>
        decision.choiceText.length > 0 ||
        decision.interpretation.length > 0
    );

  return {
    playerProfile: profile,

    currentGameState: gameState,

    importantMemories: memories,

    decisionHistory,

    timeline,

    adaptiveSignals: {
      memoryCount: memories.length,

      highImportanceMemories: memories.filter(
        (memory) => memory.importance >= 0.7
      ),

      recentDecisions: decisionHistory.slice(-5),

      recurringTags: getRecurringTags(memories),

      personalizationAvailable:
        Object.keys(profile).length > 0 ||
        memories.length > 0 ||
        decisionHistory.length > 0,
    },
  };
}

/**
 * Find recurring memory tags.
 * Recurring tags help the scenario AI understand
 * repeated player preferences without making
 * psychological claims.
 */
function getRecurringTags(memories) {
  const counts = {};

  for (const memory of memories) {
    for (const tag of memory.tags) {
      const normalizedTag = tag.trim().toLowerCase();

      if (!normalizedTag) {
        continue;
      }

      counts[normalizedTag] = (counts[normalizedTag] || 0) + 1;
    }
  }

  return Object.entries(counts)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({
      tag,
      count,
    }));
}

/**
 * Create a compact text context for an AI prompt.
 *
 * This keeps prompt construction separate from
 * memory storage and game-state mutation.
 */
export function buildAIContextText(context) {
  const safeContext = buildAIContext(context);

  return JSON.stringify(safeContext, null, 2);
}