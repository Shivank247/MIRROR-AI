import { applyMockDecision } from "./mockGameEngine";
import { MOCK_SCENARIOS } from "../services/mockGameData";

/**
 * Runs an alternative decision in an isolated copy of the game state.
 *
 * IMPORTANT:
 * The original game state is never mutated.
 */
export function simulateCounterfactual({
  originalState,
  originalDecisionId,
  alternativeChoiceId,
}) {
  if (!originalState) {
    throw new Error("Original game state is required.");
  }

  if (!originalDecisionId) {
    throw new Error("Original decision ID is required.");
  }

  if (!alternativeChoiceId) {
    throw new Error("Alternative choice ID is required.");
  }

  const originalDecision = originalState.decisions.find(
    (decision) => decision.id === originalDecisionId,
  );

  if (!originalDecision) {
    throw new Error(
      `Decision "${originalDecisionId}" was not found.`,
    );
  }

  const scenario = MOCK_SCENARIOS.find(
    (item) => item.id === originalDecision.scenarioId,
  );

  if (!scenario) {
    throw new Error(
      `Scenario "${originalDecision.scenarioId}" was not found.`,
    );
  }

  const alternativeChoice = scenario.choices.find(
    (choice) => choice.id === alternativeChoiceId,
  );

  if (!alternativeChoice) {
    throw new Error(
      `Alternative choice "${alternativeChoiceId}" was not found.`,
    );
  }

  if (alternativeChoice.id === originalDecision.choiceId) {
    throw new Error(
      "The alternative choice must be different from the original choice.",
    );
  }

  const isolatedState = {
    ...originalState,
    stats: {
      ...originalState.stats,
    },
    decisions: [...originalState.decisions],
    timeline: [...originalState.timeline],
    memories: [...(originalState.memories ?? [])],
  };

  const result = applyMockDecision(
    isolatedState,
    scenario,
    alternativeChoice.id,
  );

  return {
    originalState,
    alternateState: result.gameState,
    originalDecision,
    scenario,
    originalChoice: scenario.choices.find(
      (choice) => choice.id === originalDecision.choiceId,
    ),
    alternativeChoice,
    changes: result.changes,
    yearsAdvanced: result.yearsAdvanced,
    xpGained: result.xpGained,
    narrative: result.narrative,
  };
}

/**
 * Returns all choices from the decision's scenario except
 * the choice that was originally selected.
 */
export function getAlternativeChoices({
  gameState,
  decisionId,
}) {
  const decision = gameState?.decisions?.find(
    (item) => item.id === decisionId,
  );

  if (!decision) {
    return [];
  }

  const scenario = MOCK_SCENARIOS.find(
    (item) => item.id === decision.scenarioId,
  );

  if (!scenario) {
    return [];
  }

  return scenario.choices.filter(
    (choice) => choice.id !== decision.choiceId,
  );
}