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
 * It prepares Future Self input, delegates reasoning to an
 * injected AI function, and validates the resulting structure.
 */

import type {
  FutureSelf,
  FutureSelfInput,
} from "../../../../shared/types/futureSelf";

import {
  buildFutureSelfContext,
  type FutureSelfContextSource,
} from "./futureSelfContext";

import { validateFutureSelf } from "./futureSelfValidator";

export type FutureSelfReasoner = (
  input: FutureSelfInput,
) => Promise<FutureSelf>;

export interface GenerateFutureSelfSource
  extends FutureSelfContextSource {}

/**
 * Coordinates Future Self generation.
 *
 * The authoritative game state is treated as read-only.
 */
export class FutureSelfService {
  private readonly reasoner: FutureSelfReasoner;

  constructor(reasoner: FutureSelfReasoner) {
    this.reasoner = reasoner;
  }

  /**
   * Generate and validate a simulated Future Self.
   */
  async generate(
    source: GenerateFutureSelfSource,
  ): Promise<FutureSelf> {
    const context = buildFutureSelfContext(source);

    const result = await this.reasoner(context);

    validateFutureSelf(result);

    return result;
  }
}