import type { GameState } from "../../../../shared/types/game";

export interface AdvanceTimeResult {
  gameState: GameState;
  yearsAdvanced: number;
}

export function advanceTime(
  gameState: GameState,
  years: number,
): AdvanceTimeResult {
  if (!Number.isInteger(years) || years < 0) {
    throw new Error("Time advance must be a non-negative integer.");
  }

  if (years === 0) {
    return {
      gameState: { ...gameState },
      yearsAdvanced: 0,
    };
  }

  return {
    gameState: {
      ...gameState,
      age: gameState.age + years,
      year: gameState.year + years,
    },
    yearsAdvanced: years,
  };
}