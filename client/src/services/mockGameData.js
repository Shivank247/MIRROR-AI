export const INITIAL_STATS = {
  career: 50,
  money: 50,
  relationships: 50,
  knowledge: 50,
  creativity: 50,
  energy: 70,
  stress: 20,
};

export function createInitialMockGameState() {
  return {
    age: 20,
    year: 1,
    stats: { ...INITIAL_STATS },
    xp: 0,
    decisions: [],
    timeline: [
      {
        id: "current-self",
        age: 20,
        title: "Current Self created",
        type: "milestone",
        importance: 1,
        description: "The simulation begins.",
        timestamp: new Date().toISOString(),
      },
    ],
    memories: [],
  };
}

export const MOCK_SCENARIOS = [
  {
    id: "opportunity",
    choices: [
      {
        id: "take",
        title: "Take the opportunity",
        description: "Move forward quickly and accept the uncertainty.",
        effects: {
          career: 10,
          money: 10,
          relationships: -5,
          energy: -5,
          stress: 5,
        },
        timeAdvance: 2,
      },
      {
        id: "home",
        title: "Stay close to home",
        description: "Protect your relationships and build gradually.",
        effects: {
          relationships: 8,
          energy: 5,
          career: 2,
          money: -2,
        },
        timeAdvance: 1,
      },
      {
        id: "flexible",
        title: "Look for a flexible alternative",
        description: "Search for a middle path that keeps more doors open.",
        effects: {
          career: 5,
          relationships: 4,
          knowledge: 3,
          stress: 2,
        },
        timeAdvance: 1,
      },
    ],
    title: "The Opportunity",
    description:
      "At 20, an unexpected opportunity appears. A fast-growing company offers you a demanding role in another city. The salary is significantly higher, but the move means leaving your familiar environment and spending less time with people close to you.",
  },
  {
    id: "momentum",
    choices: [
      {
        id: "push",
        title: "Push harder",
        description: "Use the momentum now and accept that recovery can wait.",
        effects: {
          career: 8,
          money: 5,
          knowledge: 4,
          energy: -8,
          stress: 8,
        },
        timeAdvance: 2,
      },
      {
        id: "balance",
        title: "Protect your balance",
        description: "Slow down enough to protect what work cannot replace.",
        effects: {
          relationships: 7,
          energy: 7,
          stress: -5,
          career: 2,
        },
        timeAdvance: 1,
      },
      {
        id: "redesign",
        title: "Redesign the arrangement",
        description: "Find another way to keep growing without repeating the pattern.",
        effects: {
          career: 5,
          knowledge: 5,
          creativity: 4,
          stress: -2,
        },
        timeAdvance: 1,
      },
    ],
    title: "The Cost of Momentum",
    description:
      "Your work is moving faster than expected. Another project could accelerate your career, but your energy has been falling and the people around you are noticing the distance.",
  },
  {
    id: "unknown",
    choices: [
      {
        id: "milestone",
        title: "Chase the next milestone",
        description: "Commit to a clear target and see how far focus can take you.",
        effects: {
          career: 8,
          money: 7,
          knowledge: 3,
          stress: 5,
          relationships: -3,
        },
        timeAdvance: 2,
      },
      {
        id: "people",
        title: "Invest in your people",
        description: "Give more time to the relationships shaping your life.",
        effects: {
          relationships: 9,
          energy: 4,
          stress: -3,
          career: 1,
        },
        timeAdvance: 1,
      },
      {
        id: "explore",
        title: "Explore the unknown",
        description: "Choose curiosity over certainty.",
        effects: {
          creativity: 8,
          knowledge: 7,
          career: 3,
          money: -3,
          stress: 2,
        },
        timeAdvance: 1,
      },
    ],
    title: "The Choice You Keep",
    description:
      "A new opportunity asks you to decide what success means now. You can maximize the next milestone, invest in the people who have stayed with you, or experiment with a path you cannot fully explain yet.",
  },
];
