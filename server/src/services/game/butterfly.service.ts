import type { GameState } from "../../../../shared/types/game";

export type LifeTrajectory =
  | "career-focused"
  | "balanced"
  | "relationship-focused"
  | "financial-pressure"
  | "high-stress"
  | "exploratory";

export function determineTrajectory(
  gameState: GameState,
): LifeTrajectory {
  const {
    career,
    money,
    relationships,
    knowledge,
    creativity,
    stress,
  } = gameState.stats;

  if (stress >= 70) {
    return "high-stress";
  }

  if (money <= 35 && stress >= 45) {
    return "financial-pressure";
  }

  if (career >= 70 && money >= 60 && relationships < 50) {
    return "career-focused";
  }

  if (relationships >= 70 && career < 60) {
    return "relationship-focused";
  }

  if (
    career >= 55 &&
    money >= 50 &&
    relationships >= 55 &&
    stress < 50
  ) {
    return "balanced";
  }

  if (knowledge >= 65 || creativity >= 65) {
    return "exploratory";
  }

  return "balanced";
}