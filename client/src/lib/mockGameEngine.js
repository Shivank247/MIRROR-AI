const STAT_NAMES = [
  "career",
  "money",
  "relationships",
  "knowledge",
  "creativity",
  "energy",
  "stress",
];

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

export function applyMockDecision(gameState, scenario, choiceId) {
  const choice = scenario.choices.find((item) => item.id === choiceId);

  if (!choice) {
    throw new Error(`Choice "${choiceId}" was not found.`);
  }

  const stats = { ...gameState.stats };
  const changes = [];

  for (const stat of STAT_NAMES) {
    const delta = Number(choice.effects[stat] ?? 0);

    if (!delta) continue;

    const before = stats[stat];
    const after = clamp(before + delta);

    stats[stat] = after;

    changes.push({
      name: stat.charAt(0).toUpperCase() + stat.slice(1),
      delta: after - before,
    });
  }

  const yearsAdvanced = choice.timeAdvance;
  const now = new Date().toISOString();
  const decisionId = `${scenario.id}-${choice.id}-${Date.now()}`;

  const decision = {
    id: decisionId,
    scenarioId: scenario.id,
    choiceId: choice.id,
    title: choice.title,
    effects: { ...choice.effects },
    age: gameState.age,
    year: gameState.year,
    timestamp: now,
  };

  const timeline = [
    ...gameState.timeline,
    {
      id: `${decisionId}-decision`,
      age: gameState.age,
      title: `Decision: ${choice.title}`,
      type: "decision",
      importance: 0.8,
      description: scenario.title,
      decisionId,
      timestamp: now,
    },
    {
      id: `${decisionId}-chapter`,
      age: gameState.age + yearsAdvanced,
      title: `Age ${gameState.age + yearsAdvanced}: A new chapter begins`,
      type: "event",
      importance: 0.6,
      description: "Your decision moves the simulation forward.",
      timestamp: now,
    },
  ];

  return {
    gameState: {
      ...gameState,
      age: gameState.age + yearsAdvanced,
      year: gameState.year + yearsAdvanced,
      stats,
      xp: gameState.xp + 25,
      decisions: [...gameState.decisions, decision],
      timeline,
    },
    choice,
    changes,
    yearsAdvanced,
    xpGained: 25,
    narrative: `You chose to "${choice.title.toLowerCase()}." The simulation moves ${yearsAdvanced} year${yearsAdvanced === 1 ? "" : "s"} forward, and this trade-off becomes part of your story.`,
  };
}
