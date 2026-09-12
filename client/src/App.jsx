import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroPage from "./pages/IntroPage";
import ProfilePage from "./pages/ProfilePage";
import GamePage from "./pages/GamePage";
import {
  createInitialMockGameState,
  MOCK_SCENARIOS,
} from "./services/mockGameData";
import { applyMockDecision } from "./lib/mockGameEngine";

const SCREENS = {
  INTRO: "intro",
  PROFILE: "profile",
  GAME: "game",
};

function App() {
  const [screen, setScreen] = useState(SCREENS.INTRO);
  const [profileInput, setProfileInput] = useState("");
  const [playerProfile, setPlayerProfile] = useState(null);
  const [gameState, setGameState] = useState(createInitialMockGameState);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [consequence, setConsequence] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const currentScenario = useMemo(
    () => MOCK_SCENARIOS[scenarioIndex % MOCK_SCENARIOS.length],
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
    setError(null);
    setIsProcessing(false);
    setScreen(SCREENS.GAME);
  };

  const handleChoice = (choice) => {
    if (selectedChoice || consequence || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const result = applyMockDecision(
        gameState,
        currentScenario,
        choice.id,
      );

      setSelectedChoice(choice.id);
      setGameState(result.gameState);
      setConsequence(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "The simulation could not process your decision.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const continueGame = () => {
    setSelectedChoice(null);
    setConsequence(null);
    setError(null);
    setScenarioIndex((index) => index + 1);
  };

  const restart = () => {
    setProfileInput("");
    setPlayerProfile(null);
    setGameState(createInitialMockGameState());
    setScenarioIndex(0);
    setSelectedChoice(null);
    setConsequence(null);
    setError(null);
    setIsProcessing(false);
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
                onStart={() => setScreen(SCREENS.PROFILE)}
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
                onBack={() => setScreen(SCREENS.INTRO)}
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
                scenarioIndex={scenarioIndex}
                selectedChoice={selectedChoice}
                consequence={consequence}
                isProcessing={isProcessing}
                error={error}
                onChoice={handleChoice}
                onContinue={continueGame}
                onRestart={restart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
