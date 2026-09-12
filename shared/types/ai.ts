import type { StatEffects } from "./game";

export interface PlayerProfile {
  goals: string[];
  priorities: string[];
  interests: string[];
  aspirations: string[];
  riskTolerance?: "low" | "medium" | "high";
  summary: string;
}

export interface ScenarioChoice {
  id: string;
  text: string;
  effects: StatEffects;
  timeAdvance: number;
}

export interface GameScenario {
  id: string;
  title: string;
  description: string;
  context?: string;
  choices: ScenarioChoice[];
  timeAdvance: number;
}

export interface AIProfileRequest {
  inputText: string;
}

export interface AIScenarioRequest {
  profile: PlayerProfile;
  gameState: unknown;
  decisionHistory: unknown[];
  memories: unknown[];
  timeline: unknown[];
}

export interface AIProfileResponse {
  profile: PlayerProfile;
}

export interface AIScenarioResponse {
  scenario: GameScenario;
}