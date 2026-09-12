/**
 * MIRROR//AI — Future Self Context Builder
 *
 * Owner: Suraj
 *
 * This module prepares authoritative gameplay information for
 * Future Self generation.
 *
 * IMPORTANT:
 * - It does not call an AI provider.
 * - It does not mutate Game State.
 * - It does not modify decisions, memories, timeline, or stats.
 * - It only creates a clean Future Self input context.
 */

import type { GameState } from "../../../../shared/types/game";
import type { PlayerProfile } from "../../../../shared/types/ai";
import type { FutureSelfInput } from "../../../../shared/types/futureSelf";

export interface FutureSelfContextSource {
  profile: PlayerProfile;
  gameState: GameState;
  trajectory: string;
}

/**
 * Builds the input context consumed by the Future Self system.
 *
 * GameState is the authoritative source for:
 * - decisions
 * - memories
 * - timeline
 *
 * The source objects are treated as read-only.
 */
export function buildFutureSelfContext(
  source: FutureSelfContextSource,
): FutureSelfInput {
  return {
    profile: source.profile,
    gameState: source.gameState,
    decisionHistory: [...source.gameState.decisions],
    memories: [...source.gameState.memories],
    timeline: [...source.gameState.timeline],
    trajectory: source.trajectory,
  };
}