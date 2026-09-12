/**
 * MIRROR//AI — Future Self Type Contracts
 *
 * Owner: Suraj
 *
 * Future Self consumes gameplay history and produces a
 * simulated future representation.
 *
 * It must never directly mutate the authoritative Game State.
 */

export interface FutureSelfInput {
  profile: unknown;
  gameState: unknown;
  decisionHistory: unknown[];
  memories: unknown[];
  timeline: unknown[];
  trajectory: string;
}

/**
 * Gameplay-oriented personality characteristics.
 *
 * These are simulation characteristics, not psychological
 * or medical assessments.
 */
export interface FutureSelfPersonality {
  confidence: number;
  riskTolerance: number;
  discipline: number;
}

/**
 * Structured representation of the player's simulated Future Self.
 */
export interface FutureSelf {
  age: number;

  career: string;

  financialState: string;

  relationships: string;

  skills: string[];

  lifestyle: string;

  achievements: string[];

  regrets: string[];

  personality: FutureSelfPersonality;

  majorDecisions: string[];

  trajectorySummary: string;

  futureVoice?: {
    tone: string;
    style: string;
  };
}

/**
 * Response returned after Future Self generation.
 */
export interface FutureSelfGenerationResponse {
  futureSelf: FutureSelf;
}

/**
 * Request for conversation with the generated Future Self.
 */
export interface FutureSelfChatRequest {
  futureSelf: FutureSelf;

  question: string;

  context: FutureSelfInput;
}

/**
 * Response from Future Self conversation.
 */
export interface FutureSelfChatResponse {
  response: string;
}

/**
 * Request for a What-If / counterfactual simulation.
 *
 * The original state is authoritative.
 * The alternative choice must be simulated separately.
 */
export interface CounterfactualRequest {
  originalState: unknown;

  originalDecisionId: string;

  alternativeChoiceId: string;
}

/**
 * Result of a What-If / counterfactual simulation.
 */
export interface CounterfactualResponse {
  originalFuture: FutureSelf;

  alternateFuture: FutureSelf;

  explanation: string;
}