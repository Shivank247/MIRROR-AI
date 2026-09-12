import type {
  GameDecision,
  GameMemoryReference,
  GameState,
  TimelineEvent,
} from "../../../../shared/types/game";
import type { PlayerProfile } from "../../../../shared/types/ai";
import type { LifeTrajectory } from "./butterfly.service";

export interface AIContext {
  profile: PlayerProfile;
  trajectory: LifeTrajectory;
  currentState: {
    age: number;
    year: number;
    stats: GameState["stats"];
    xp: number;
  };
  recentDecisions: GameDecision[];
  recentTimeline: TimelineEvent[];
  memories: GameMemoryReference[];
}

export interface BuildAIContextInput {
  profile: PlayerProfile;
  gameState: GameState;
  trajectory: LifeTrajectory;
  recentDecisionLimit?: number;
  recentTimelineLimit?: number;
}

export function buildAIContext({
  profile,
  gameState,
  trajectory,
  recentDecisionLimit = 5,
  recentTimelineLimit = 10,
}: BuildAIContextInput): AIContext {
  if (
    !Number.isInteger(recentDecisionLimit) ||
    !Number.isInteger(recentTimelineLimit) ||
    recentDecisionLimit < 0 ||
    recentTimelineLimit < 0
  ) {
    throw new Error("Context limits must be non-negative integers.");
  }

  return {
    profile,
    trajectory,
    currentState: {
      age: gameState.age,
      year: gameState.year,
      stats: { ...gameState.stats },
      xp: gameState.xp,
    },
    recentDecisions: gameState.decisions.slice(-recentDecisionLimit),
    recentTimeline: gameState.timeline.slice(-recentTimelineLimit),
    memories: [...gameState.memories],
  };
}