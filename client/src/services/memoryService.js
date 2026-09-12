import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_DIR = path.join(__dirname, "data");
const MEMORY_FILE = path.join(MEMORY_DIR, "playerMemories.json");

async function ensureMemoryStorage() {
  await fs.mkdir(MEMORY_DIR, { recursive: true });

  try {
    await fs.access(MEMORY_FILE);
  } catch {
    await fs.writeFile(
      MEMORY_FILE,
      JSON.stringify({}, null, 2),
      "utf-8"
    );
  }
}

async function readMemories() {
  await ensureMemoryStorage();

  const content = await fs.readFile(MEMORY_FILE, "utf-8");

  if (!content.trim()) {
    return {};
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Memory storage contains invalid JSON.");
  }
}

async function writeMemories(memories) {
  await ensureMemoryStorage();

  await fs.writeFile(
    MEMORY_FILE,
    JSON.stringify(memories, null, 2),
    "utf-8"
  );
}

function validatePlayerId(playerId) {
  if (
    typeof playerId !== "string" ||
    !playerId.trim()
  ) {
    throw new Error("Player ID is required.");
  }

  return playerId.trim();
}

function validateMemoryType(type) {
  const allowedTypes = [
    "value",
    "priority",
    "goal",
    "interest",
    "decision",
    "reasoning",
  ];

  if (!allowedTypes.includes(type)) {
    throw new Error(
      `Invalid memory type. Allowed types: ${allowedTypes.join(", ")}`
    );
  }
}

export async function storeMemory({
  playerId,
  type,
  content,
  source = "ai",
  importance = "medium",
  metadata = {},
}) {
  const validPlayerId = validatePlayerId(playerId);

  validateMemoryType(type);

  if (
    typeof content !== "string" ||
    !content.trim()
  ) {
    throw new Error("Memory content is required.");
  }

  const allowedImportance = [
    "low",
    "medium",
    "high",
  ];

  if (!allowedImportance.includes(importance)) {
    throw new Error(
      "Importance must be low, medium, or high."
    );
  }

  const memories = await readMemories();

  if (!memories[validPlayerId]) {
    memories[validPlayerId] = [];
  }

  const memory = {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`,

    type,

    content: content.trim(),

    source,

    importance,

    metadata,

    createdAt: new Date().toISOString(),
  };

  memories[validPlayerId].push(memory);

  await writeMemories(memories);

  return memory;
}

export async function getPlayerMemories(playerId) {
  const validPlayerId = validatePlayerId(playerId);

  const memories = await readMemories();

  return memories[validPlayerId] || [];
}

export async function getMemoriesByType({
  playerId,
  type,
}) {
  validateMemoryType(type);

  const memories = await getPlayerMemories(playerId);

  return memories.filter(
    (memory) => memory.type === type
  );
}

export async function getImportantMemories(
  playerId
) {
  const memories = await getPlayerMemories(playerId);

  return memories.filter(
    (memory) => memory.importance === "high"
  );
}

export async function buildMemoryContext(
  playerId
) {
  const memories = await getPlayerMemories(playerId);

  if (memories.length === 0) {
    return "No previous player memories are available.";
  }

  const grouped = {
    values: [],
    priorities: [],
    goals: [],
    interests: [],
    decisions: [],
    reasoning: [],
  };

  for (const memory of memories) {
    if (memory.type === "value") {
      grouped.values.push(memory.content);
    }

    if (memory.type === "priority") {
      grouped.priorities.push(memory.content);
    }

    if (memory.type === "goal") {
      grouped.goals.push(memory.content);
    }

    if (memory.type === "interest") {
      grouped.interests.push(memory.content);
    }

    if (memory.type === "decision") {
      grouped.decisions.push(memory.content);
    }

    if (memory.type === "reasoning") {
      grouped.reasoning.push(memory.content);
    }
  }

  return JSON.stringify(
    {
      playerId,
      memoryCount: memories.length,
      values: grouped.values,
      priorities: grouped.priorities,
      goals: grouped.goals,
      interests: grouped.interests,
      previousDecisions: grouped.decisions,
      previousReasoning: grouped.reasoning,
    },
    null,
    2
  );
}