import type {
  GameState,
  TimelineEvent,
} from "../../../../shared/types/game";
import type { GameScenario } from "../../../../shared/types/ai";
import { processDecision } from "./decision.service";

export interface ApplyConsequenceInput {
  gameState: GameState;
  scenario: GameScenario;
  choiceId: string;
  now?: string;
}

function createTimelineEvent(
  scenario: GameScenario,
  choiceId: string,
  gameState: GameState,
  decisionId: string,
  timestamp: string,
): TimelineEvent {
  const choice = scenario.choices.find((item) => item.id === choiceId);

  return {
    id: crypto.randomUUID(),
    age: gameState.age,
    title: `Decision: ${choice?.text ?? choiceId}`,
    type: "decision",
    importance: 0.7,
    description: scenario.description,
    decisionId,
    timestamp,
  };
}

export function applyDecisionConsequences({
  gameState,
  scenario,
  choiceId,
  now = new Date().toISOString(),
}: ApplyConsequenceInput): GameState {
  const updatedState = processDecision({
    gameState,
    scenario,
    choiceId,
    now,
  });

  const decision =
    updatedState.decisions[updatedState.decisions.length - 1];

  const timelineEvent = createTimelineEvent(
    scenario,
    choiceId,
    updatedState,
    decision.id,
    now,
  );

  return {
    ...updatedState,
    timeline: [...updatedState.timeline, timelineEvent],
  };
}