import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import IntroPage from "./pages/IntroPage";
import ProfilePage from "./pages/ProfilePage";
import GamePage from "./pages/GamePage";

import FutureSelfReveal from "./components/future/FutureSelfReveal";
import FutureSelfScene from "./components/future/FutureSelfScene";
import FutureSelfChat from "./components/future/FutureSelfChat";

import {
  createInitialMockGameState,
  MOCK_SCENARIOS,
} from "./services/mockGameData";

import { applyMockDecision } from "./lib/mockGameEngine";

const SCREENS = {
  INTRO: "intro",
  PROFILE: "profile",
  GAME: "game",
  FUTURE: "future",
};

/**
 * Temporary Future Self projection for the frontend/Babylon MVP.
 *
 * This is intentionally deterministic and based only on the
 * authoritative gameplay state.
 *
 * Later this object can be replaced by the real Future Self
 * AI service without changing the Babylon presentation layer.
 */
function buildFutureSelfPreview(gameState, playerProfile) {
  const stats = gameState.stats;

  const career =
    stats.career >= 75
      ? "High-Impact Professional"
      : stats.career >= 60
        ? "Rising Professional"
        : "Independent Path";

  const financialState =
    stats.money >= 75
      ? "Financially strong"
      : stats.money >= 60
        ? "Financially stable"
        : "Still building";

  const relationships =
    stats.relationships >= 75
      ? "Deeply connected"
      : stats.relationships >= 60
        ? "Strong relationships"
        : "Relationships need attention";

  const lifestyle =
    stats.energy >= 70 && stats.stress < 35
      ? "Balanced and sustainable"
      : stats.stress >= 60
        ? "Ambitious but demanding"
        : "Focused and evolving";

  const personality = {
    confidence: Math.max(
      0,
      Math.min(1, stats.career / 100),
    ),

    riskTolerance: Math.max(
      0,
      Math.min(
        1,
        (stats.career + stats.creativity - stats.stress) / 200,
      ),
    ),

    discipline: Math.max(
      0,
      Math.min(
        1,
        (stats.knowledge + stats.career) / 200,
      ),
    ),
  };

  const majorDecisions = gameState.decisions.map(
    (decision) => decision.title,
  );

  return {
    age: gameState.age + 10,

    career,

    financialState,

    relationships,

    skills: [
      stats.knowledge >= 60
        ? "Deep knowledge"
        : "Growing knowledge",

      stats.creativity >= 60
        ? "Creative thinking"
        : "Structured thinking",

      stats.career >= 60
        ? "Career leadership"
        : "Career development",
    ],

    lifestyle,

    achievements: [
      stats.career >= 60
        ? "Built meaningful career momentum"
        : "Started building a career path",

      stats.knowledge >= 60
        ? "Expanded knowledge through deliberate choices"
        : "Continued learning through experience",
    ],

    regrets: [
      stats.relationships < 45
        ? "Some relationships received less attention than they deserved."
        : "Few major regrets from the choices made.",

      stats.energy < 45
        ? "Pushed beyond sustainable energy levels."
        : "Learned to protect long-term energy.",
    ],

    personality,

    majorDecisions,

    trajectorySummary: playerProfile?.summary
      ? `A future shaped by the goal: "${playerProfile.summary}". Your decisions created a trajectory toward ${career.toLowerCase()} while balancing money, relationships, knowledge, energy, and stress.`
      : `Your decisions created a trajectory toward ${career.toLowerCase()} while balancing money, relationships, knowledge, energy, and stress.`,

    futureVoice: {
      tone: "reflective",
      style: "direct and personal",
    },
  };
}

function App() {
  const [screen, setScreen] = useState(SCREENS.INTRO);

  const [profileInput, setProfileInput] = useState("");

  const [playerProfile, setPlayerProfile] = useState(null);

  const [gameState, setGameState] = useState(
    createInitialMockGameState,
  );

  const [scenarioIndex, setScenarioIndex] = useState(0);

  const [selectedChoice, setSelectedChoice] = useState(null);

  const [consequence, setConsequence] = useState(null);

  const [futureSelf, setFutureSelf] = useState(null);

  const [futureSelfMode, setFutureSelfMode] =
    useState("reveal");

  const currentScenario = useMemo(
    () =>
      MOCK_SCENARIOS[
        scenarioIndex % MOCK_SCENARIOS.length
      ],
    [scenarioIndex],
  );

  const createProfile = () => {
    const value = profileInput.trim();

    if (!value) return;

    setPlayerProfile({
      goals: [value],
      priorities: [],
      interests: [],
      aspirations: [],
      summary: value,
    });

    setGameState(createInitialMockGameState());
    setScenarioIndex(0);
    setSelectedChoice(null);
    setConsequence(null);
    setFutureSelf(null);
    setFutureSelfMode("reveal");

    setScreen(SCREENS.GAME);
  };

  const handleChoice = (choice) => {
    if (selectedChoice || consequence) return;

    const result = applyMockDecision(
      gameState,
      currentScenario,
      choice.id,
    );

    setSelectedChoice(choice.id);
    setGameState(result.gameState);
    setConsequence(result);
  };

  const continueGame = () => {
    setSelectedChoice(null);
    setConsequence(null);

    const isLastScenario =
      scenarioIndex >= MOCK_SCENARIOS.length - 1;

    if (isLastScenario) {
      const generatedFutureSelf =
        buildFutureSelfPreview(
          gameState,
          playerProfile,
        );

      setFutureSelfMode("reveal");
      setFutureSelf(generatedFutureSelf);
      setScreen(SCREENS.FUTURE);

      return;
    }

    setScenarioIndex((index) => index + 1);
  };

  /**
   * Temporary local Future Self responder.
   *
   * This is only for testing the conversation UI.
   * It will later be replaced by the real backend
   * Future Self AI reasoning service.
   */
  const handleFutureSelfAsk = async (question) => {
    const normalized = question.toLowerCase();

    if (normalized.includes("worth")) {
      return "Yes — but not because every decision was perfect. This future came from the choices you actually made. The important question is whether the trade-offs were worth the life they created.";
    }

    if (normalized.includes("decision")) {
      const decisions = gameState.decisions
        .map((decision) => decision.title)
        .join(", ");

      return decisions
        ? `The decisions that shaped this trajectory were: ${decisions}. Each one contributed to the direction you see now.`
        : "Your decision history is still too limited for me to identify a defining turning point.";
    }

    if (normalized.includes("different")) {
      return "I would reconsider the choices that created the biggest trade-offs between career, relationships, energy, and stress. A different choice could create a different trajectory.";
    }

    return `I remember the trajectory created by your decisions. You asked: "${question}" My answer should ultimately come from the actual history, consequences, and memories of this simulation.`;
  };

  const restart = () => {
    setProfileInput("");
    setPlayerProfile(null);
    setGameState(createInitialMockGameState());
    setScenarioIndex(0);
    setSelectedChoice(null);
    setConsequence(null);
    setFutureSelf(null);
    setFutureSelfMode("reveal");

    setScreen(SCREENS.INTRO);
  };

  return (
    <div className="min-h-screen bg-[#050607] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {screen === SCREENS.INTRO && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IntroPage
                onStart={() =>
                  setScreen(SCREENS.PROFILE)
                }
              />
            </motion.div>
          )}

          {screen === SCREENS.PROFILE && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
            >
              <ProfilePage
                value={profileInput}
                onChange={setProfileInput}
                onContinue={createProfile}
                onBack={() =>
                  setScreen(SCREENS.INTRO)
                }
              />
            </motion.div>
          )}

          {screen === SCREENS.GAME && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GamePage
                profile={playerProfile}
                gameState={gameState}
                scenario={currentScenario}
                selectedChoice={selectedChoice}
                consequence={consequence}
                onChoice={handleChoice}
                onContinue={continueGame}
                onRestart={restart}
              />
            </motion.div>
          )}

          {screen === SCREENS.FUTURE && (
            <motion.div
              key="future"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <main className="min-h-screen">
                <FutureSelfReveal
                  futureSelf={futureSelf}
                  onTalk={() =>
                    setFutureSelfMode("chat")
                  }
                  onWhatIf={() => {
                    console.log(
                      "Future Self What-If coming next",
                    );
                  }}
                />

                <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "24px",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      background: "#02040a",
                    }}
                  >
                    <FutureSelfScene
                      futureSelf={futureSelf}
                      reveal
                    />
                  </div>
                </div>

                {futureSelfMode === "chat" && (
                  <FutureSelfChat
                    futureSelf={futureSelf}
                    onAsk={handleFutureSelfAsk}
                  />
                )}
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;