/**
 * MIRROR//AI — Future Self Service
 *
 * Owner: Suraj
 *
 * Responsible for coordinating Future Self generation.
 *
 * This service does NOT:
 * - mutate Game State
 * - own the Game Engine
 * - own the AI provider
 * - own the Memory system
 *
 * It prepares Future Self input and delegates reasoning
 * to an injected AI function.
 */

import type {
  FutureSelf,
  FutureSelfInput,
} from "../../../../shared/types/futureSelf";

import {
  buildFutureSelfContext,
  type FutureSelfContextSource,
} from "./futureSelfContext";

export type FutureSelfReasoner = (
  input: FutureSelfInput,
) => Promise<FutureSelf>;

export interface GenerateFutureSelfSource extends FutureSelfContextSource {}

export class FutureSelfService {
  private readonly reasoner: FutureSelfReasoner;

  constructor(reasoner: FutureSelfReasoner) {
    this.reasoner = reasoner;
  }

  /**
   * Generate a simulated Future Self from gameplay history.
   *
   * The authoritative game state is treated as read-only.
   */
  async generate(
    source: GenerateFutureSelfSource,
  ): Promise<FutureSelf> {
    const context = buildFutureSelfContext(source);

    return this.reasoner(context);
  }
}