import type { GameState } from "./game";
import type { PlayerProfile } from "./ai";

export interface FutureSelfInput {
  profile: PlayerProfile;
  gameState: GameState;
  decisionHistory: GameState["decisions"];
  memories: GameState["memories"];
  timeline: GameState["timeline"];
  trajectory: string;
}

export interface FutureSelf {
  age: number;
  career: string;
  financialState: string;
  relationships: string;
  lifestyle: string;
  achievements: string[];
  regrets: string[];
  majorDecisions: string[];
  trajectorySummary: string;
  futureVoice?: {
    tone: string;
    style: string;
  };
}

export interface CounterfactualRequest {
  originalState: GameState;
  originalDecision: GameState["decisions"][number];
  alternativeChoiceId: string;
}

export interface CounterfactualResponse {
  originalFuture: FutureSelf;
  alternateFuture: FutureSelf;
  explanation: string;
}