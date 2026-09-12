/**
 * MIRROR//AI — Future Self Validator
 *
 * Owner: Suraj
 *
 * Validates structured Future Self output before it is consumed
 * by the presentation, conversation, or counterfactual layers.
 *
 * This validator does not call AI and does not mutate Game State.
 */

import type {
  FutureSelf,
  FutureSelfPersonality,
} from "../../../../shared/types/futureSelf";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => isNonEmptyString(item))
  );
}

function isValidPersonality(
  value: unknown,
): value is FutureSelfPersonality {
  if (!value || typeof value !== "object") {
    return false;
  }

  const personality = value as Record<string, unknown>;

  return (
    typeof personality.confidence === "number" &&
    typeof personality.riskTolerance === "number" &&
    typeof personality.discipline === "number"
  );
}

/**
 * Returns true when the supplied value matches the required
 * Future Self structure.
 */
export function isValidFutureSelf(
  value: unknown,
): value is FutureSelf {
  if (!value || typeof value !== "object") {
    return false;
  }

  const futureSelf = value as Record<string, unknown>;

  return (
    typeof futureSelf.age === "number" &&
    futureSelf.age > 0 &&
    isNonEmptyString(futureSelf.career) &&
    isNonEmptyString(futureSelf.financialState) &&
    isNonEmptyString(futureSelf.relationships) &&
    isStringArray(futureSelf.skills) &&
    isNonEmptyString(futureSelf.lifestyle) &&
    isStringArray(futureSelf.achievements) &&
    isStringArray(futureSelf.regrets) &&
    isValidPersonality(futureSelf.personality) &&
    isStringArray(futureSelf.majorDecisions) &&
    isNonEmptyString(futureSelf.trajectorySummary)
  );
}

/**
 * Validates Future Self data and throws an explicit error when
 * the structure is invalid.
 */
export function validateFutureSelf(
  value: unknown,
): asserts value is FutureSelf {
  if (!isValidFutureSelf(value)) {
    throw new Error(
      "Invalid Future Self data: required fields are missing or malformed.",
    );
  }
}