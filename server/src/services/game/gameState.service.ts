import type { GameState, GameStats } from "../../../../shared/types/game";
import {
  GAME_CONSTANTS,
  INITIAL_GAME_STATS,
} from "../../../../shared/constants/game";

const STAT_NAMES = Object.keys(INITIAL_GAME_STATS) as Array<keyof GameStats>;

function clampStat(value: number): number {
  return Math.min(
    GAME_CONSTANTS.MAX_STAT,
    Math.max(GAME_CONSTANTS.MIN_STAT, value),
  );
}

export function createInitialGameState(): GameState {
  return {
    age: GAME_CONSTANTS.INITIAL_AGE,
    year: GAME_CONSTANTS.INITIAL_YEAR,
    stats: { ...INITIAL_GAME_STATS },
    xp: GAME_CONSTANTS.INITIAL_XP,
    decisions: [],
    timeline: [],
    memories: [],
  };
}

export function clampStats(stats: GameStats): GameStats {
  const clampedStats = { ...stats };

  for (const statName of STAT_NAMES) {
    clampedStats[statName] = clampStat(clampedStats[statName]);
  }

  return clampedStats;
}

export function updateStats(
  currentStats: GameStats,
  changes: Partial<GameStats>,
): GameStats {
  const updatedStats = { ...currentStats };

  for (const statName of STAT_NAMES) {
    const change = changes[statName];

    if (typeof change === "number") {
      updatedStats[statName] = currentStats[statName] + change;
    }
  }

  return clampStats(updatedStats);
}