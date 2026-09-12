import { z } from "zod";

const stringArray = z
  .array(z.string().trim().min(1))
  .max(10);

export const playerProfileSchema = z.object({
  goals: stringArray,
  priorities: stringArray,
  interests: stringArray,
  aspirations: stringArray,
  risk_tolerance: z.enum([
    "low",
    "moderate",
    "high",
    "unknown",
  ]),
  summary: z.string().trim().min(1).max(500),
});

export const playerProfileJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    goals: {
      type: "array",
      items: {
        type: "string",
      },
    },
    priorities: {
      type: "array",
      items: {
        type: "string",
      },
    },
    interests: {
      type: "array",
      items: {
        type: "string",
      },
    },
    aspirations: {
      type: "array",
      items: {
        type: "string",
      },
    },
    risk_tolerance: {
      type: "string",
      enum: ["low", "moderate", "high", "unknown"],
    },
    summary: {
      type: "string",
    },
  },
  required: [
    "goals",
    "priorities",
    "interests",
    "aspirations",
    "risk_tolerance",
    "summary",
  ],
};

export function normalizePlayerProfile(profile) {
  return {
    goals: Array.isArray(profile?.goals)
      ? profile.goals.filter(Boolean).map(String)
      : [],

    priorities: Array.isArray(profile?.priorities)
      ? profile.priorities.filter(Boolean).map(String)
      : [],

    interests: Array.isArray(profile?.interests)
      ? profile.interests.filter(Boolean).map(String)
      : [],

    aspirations: Array.isArray(profile?.aspirations)
      ? profile.aspirations.filter(Boolean).map(String)
      : [],

    risk_tolerance:
      profile?.risk_tolerance === "low" ||
      profile?.risk_tolerance === "moderate" ||
      profile?.risk_tolerance === "high"
        ? profile.risk_tolerance
        : "unknown",

    summary:
      typeof profile?.summary === "string"
        ? profile.summary.trim()
        : "No player summary available.",
  };
}