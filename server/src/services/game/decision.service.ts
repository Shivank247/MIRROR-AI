import type {
  GameDecision,
  GameState,
} from "../../../../shared/types/game";
import type {
  GameScenario,
  ScenarioChoice,
} from "../../../../shared/types/ai";
import { updateStats } from "./gameState.service";

export interface ProcessDecisionInput {
  gameState: GameState;
  scenario: GameScenario;
  choiceId: string;
  now?: string;
}

function findChoice(
  scenario: GameScenario,
  choiceId: string,
): ScenarioChoice | undefined {
  return scenario.choices.find((choice) => choice.id === choiceId);
}

function createDecisionRecord(
  scenario: GameScenario,
  choice: ScenarioChoice,
  gameState: GameState,
  timestamp: string,
): GameDecision {
  return {
    id: crypto.randomUUID(),
    scenarioId: scenario.id,
    choiceId: choice.id,
    title: choice.text,
    effects: { ...choice.effects },
    age: gameState.age,
    year: gameState.year,
    timestamp,
  };
}

export function processDecision({
  gameState,
  scenario,
  choiceId,
  now = new Date().toISOString(),
}: ProcessDecisionInput): GameState {
  if (!scenario.id) {
    throw new Error("Invalid scenario: missing scenario id.");
  }

  if (!choiceId.trim()) {
    throw new Error("Invalid decision: choice id is required.");
  }

  const choice = findChoice(scenario, choiceId);

  if (!choice) {
    throw new Error(
      `Invalid decision: choice "${choiceId}" does not exist in scenario "${scenario.id}".`,
    );
  }

  if (!Number.isFinite(choice.timeAdvance) || choice.timeAdvance < 0) {
    throw new Error(
      `Invalid decision: choice "${choice.id}" has an invalid timeAdvance.`,
    );
  }

  const updatedStats = updateStats(gameState.stats, choice.effects);

  const decision = createDecisionRecord(
    scenario,
    choice,
    gameState,
    now,
  );

  return {
    ...gameState,
    stats: updatedStats,
    decisions: [...gameState.decisions, decision],
  };
}