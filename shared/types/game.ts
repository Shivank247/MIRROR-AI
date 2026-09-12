export type GameStatName =
  | "career"
  | "money"
  | "relationships"
  | "knowledge"
  | "creativity"
  | "energy"
  | "stress";

export type GameStats = Record<GameStatName, number>;

export interface StatEffects {
  career?: number;
  money?: number;
  relationships?: number;
  knowledge?: number;
  creativity?: number;
  energy?: number;
  stress?: number;
}

export interface GameDecision {
  id: string;
  scenarioId: string;
  choiceId: string;
  title: string;
  effects: StatEffects;
  age: number;
  year: number;
  timestamp: string;
}

export interface TimelineEvent {
  id: string;
  age: number;
  title: string;
  type: "decision" | "event" | "milestone" | "future";
  importance: number;
  description?: string;
  decisionId?: string;
  timestamp: string;
}

export interface GameMemoryReference {
  id: string;
  type:
    | "PROFILE"
    | "DECISION"
    | "EVENT"
    | "PREFERENCE"
    | "GOAL"
    | "ACHIEVEMENT"
    | "FAILURE"
    | "RELATIONSHIP"
    | "TURNING_POINT";
  summary: string;
}

export interface GameState {
  age: number;
  year: number;
  stats: GameStats;
  xp: number;
  decisions: GameDecision[];
  timeline: TimelineEvent[];
  memories: GameMemoryReference[];
}