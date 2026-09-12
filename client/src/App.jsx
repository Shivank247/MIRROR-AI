import { useMemo, useState } from "react";

import IntroPage from "./pages/IntroPage";
import ProfilePage from "./pages/ProfilePage";
import GamePage from "./pages/GamePage";

import FutureSelfScene from "./components/future/FutureSelfScene";
import FutureSelfStats from "./components/future/FutureSelfStats";
import FutureSelfChat from "./components/future/FutureSelfChat";
import FutureSelfWhatIf from "./components/future/FutureSelfWhatIf";

import {
  generateFutureSelf,
  askFutureSelf,
} from "./services/futureSelfApi";

import {
  createInitialMockGameState,
  MOCK_SCENARIOS,
} from "./services/mockGameData";

import { applyMockDecision } from "./lib/mockGameEngine";
import { simulateCounterfactual } from "./lib/counterfactualSimulator";

import "./index.css";

function App() {
  const [page, setPage] = useState("intro");

  const [profileText, setProfileText] = useState("");

  const [gameState, setGameState] = useState(
    createInitialMockGameState(),
  );

  const [scenarioIndex, setScenarioIndex] = useState(0);

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [consequence, setConsequence] = useState(null);

  const [futureSelf, setFutureSelf] = useState(null);
  const [futureSelfLoading, setFutureSelfLoading] = useState(false);
  const [futureSelfError, setFutureSelfError] = useState("");

  const [futureView, setFutureView] = useState("main");

  const [whatIfResult, setWhatIfResult] = useState(null);

  const [chatLoading, setChatLoading] = useState(false);

  const scenario = MOCK_SCENARIOS[scenarioIndex];

  const profile = useMemo(
    () => ({
      summary: profileText,
      goals: profileText ? [profileText] : [],
      interests: [],
      currentAge: gameState.age,
    }),
    [profileText, gameState.age],
  );

  /*
   * ---------------------------------------------------------
   * INTRO
   * ---------------------------------------------------------
   */

  const handleStart = () => {
    setPage("profile");
  };

  /*
   * ---------------------------------------------------------
   * PROFILE
   * ---------------------------------------------------------
   */

  const handleProfileContinue = () => {
    if (!profileText.trim()) return;

    setPage("game");
  };

  const handleProfileBack = () => {
    setPage("intro");
  };

  /*
   * ---------------------------------------------------------
   * GAME
   * ---------------------------------------------------------
   */

  const handleChoice = (choice) => {
    if (!choice || !scenario) return;

    try {
      const result = applyMockDecision(
        gameState,
        scenario,
        choice.id,
      );

      setGameState(result.gameState);
      setSelectedChoice(choice);
      setConsequence(result);
      setFutureSelfError("");
    } catch (error) {
      console.error("Decision error:", error);

      setFutureSelfError(
        error?.message ||
          "Unable to apply this decision.",
      );
    }
  };

  const handleContinue = async () => {
    if (!selectedChoice) {
      return;
    }

    if (scenarioIndex < MOCK_SCENARIOS.length - 1) {
      setScenarioIndex((current) => current + 1);
      setSelectedChoice(null);
      setConsequence(null);
      setFutureSelfError("");
      return;
    }

    await generateFutureSelfResult();
  };

  /*
   * ---------------------------------------------------------
   * FUTURE SELF GENERATION
   * ---------------------------------------------------------
   */

  const generateFutureSelfResult = async () => {
    try {
      setFutureSelfLoading(true);
      setFutureSelfError("");
      setFutureView("main");
      setWhatIfResult(null);

      const trajectory = gameState.decisions
        .map(
          (decision, index) =>
            `Decision ${index + 1}: ${decision.title}`,
        )
        .join("\n");

      const result = await generateFutureSelf({
        profile,
        gameState,
        trajectory,
      });

      setFutureSelf(result);
      setPage("future");
    } catch (error) {
      console.error(
        "Future Self generation error:",
        error,
      );

      setFutureSelfError(
        error?.message ||
          "Future Self could not be generated.",
      );
    } finally {
      setFutureSelfLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * FUTURE SELF CHAT
   * ---------------------------------------------------------
   */

  const handleAskFutureSelf = async (question) => {
    if (!futureSelf || !question?.trim()) {
      return;
    }

    try {
      setChatLoading(true);
      setFutureSelfError("");

      const response = await askFutureSelf({
        futureSelf,
        question,
        context: {
          profile,
          gameState,
        },
      });

      return response;
    } catch (error) {
      console.error(
        "Future Self chat error:",
        error,
      );

      setFutureSelfError(
        error?.message ||
          "Future Self could not answer right now.",
      );

      throw error;
    } finally {
      setChatLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * WHAT IF / COUNTERFACTUAL
   * ---------------------------------------------------------
   */

  const handleWhatIfSimulation = ({
    originalDecisionId,
    alternativeChoiceId,
  }) => {
    try {
      setFutureSelfError("");

      const result = simulateCounterfactual({
        originalState: gameState,
        originalDecisionId,
        alternativeChoiceId,
      });

      setWhatIfResult(result);
      setFutureView("whatif");
    } catch (error) {
      console.error(
        "Counterfactual simulation error:",
        error,
      );

      setFutureSelfError(
        error?.message ||
          "The alternate future could not be simulated.",
      );
    }
  };

  const handleBackFromWhatIf = () => {
    setWhatIfResult(null);
    setFutureView("main");
    setFutureSelfError("");
  };

  /*
   * ---------------------------------------------------------
   * RESTART
   * ---------------------------------------------------------
   */

  const handleRestart = () => {
    setPage("intro");

    setProfileText("");

    setGameState(
      createInitialMockGameState(),
    );

    setScenarioIndex(0);

    setSelectedChoice(null);
    setConsequence(null);

    setFutureSelf(null);
    setFutureSelfLoading(false);
    setFutureSelfError("");

    setFutureView("main");
    setWhatIfResult(null);

    setChatLoading(false);
  };

  /*
   * ---------------------------------------------------------
   * FUTURE SELF PAGE
   * ---------------------------------------------------------
   */

  const renderFutureSelfPage = () => {
    if (futureSelfLoading) {
      return (
        <main className="min-h-screen bg-black px-6 py-20 text-white">
          <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center text-center">
            <div className="mb-6 h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />

            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              MIRROR//AI
            </p>

            <h1 className="mt-4 text-3xl font-medium">
              Building your Future Self...
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/40">
              Your decisions are being analyzed to construct
              a possible future trajectory.
            </p>
          </div>
        </main>
      );
    }

    if (!futureSelf) {
      return (
        <main className="min-h-screen bg-black px-6 py-20 text-white">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-medium">
              Future Self unavailable
            </h1>

            <p className="mt-3 text-sm text-white/45">
              {futureSelfError ||
                "No Future Self data was returned."}
            </p>

            <button
              type="button"
              onClick={handleRestart}
              className="mt-8 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
            >
              RESTART
            </button>
          </div>
        </main>
      );
    }

    if (futureView === "whatif") {
      return (
        <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
          <div className="mx-auto max-w-5xl">
            <FutureSelfWhatIf
              gameState={gameState}
              onBack={handleBackFromWhatIf}
              onSimulate={handleWhatIfSimulation}
            />

            {whatIfResult && (
              <section className="mx-auto mt-8 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                  Alternate Timeline
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  A different future was possible.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/45">
                  {whatIfResult.narrative}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Age
                    </p>

                    <p className="mt-2 text-xl text-white/80">
                      {whatIfResult.alternateState.age}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Years Advanced
                    </p>

                    <p className="mt-2 text-xl text-white/80">
                      {whatIfResult.yearsAdvanced}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      XP Gained
                    </p>

                    <p className="mt-2 text-xl text-white/80">
                      +{whatIfResult.xpGained}
                    </p>
                  </div>
                </div>

                {whatIfResult.changes?.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-xs uppercase tracking-wider text-white/30">
                      Stat Changes
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {whatIfResult.changes.map(
                        (change) => (
                          <span
                            key={change.name}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60"
                          >
                            {change.name}{" "}
                            {change.delta > 0
                              ? `+${change.delta}`
                              : change.delta}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleBackFromWhatIf}
                  className="mt-8 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.1]"
                >
                  BACK TO FUTURE SELF
                </button>
              </section>
            )}
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                MIRROR//AI
              </p>

              <h1 className="mt-2 text-3xl font-medium sm:text-4xl">
                Your Future Self
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                This is one possible future created by the
                decisions you made in the simulation.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRestart}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/50 transition hover:bg-white/[0.05] hover:text-white/80"
            >
              RESTART SIMULATION
            </button>
          </header>

          {futureSelfError && (
            <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
              {futureSelfError}
            </div>
          )}

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <FutureSelfScene
              futureSelf={futureSelf}
              reveal
            />
          </section>

          <section className="mt-8">
            <FutureSelfStats
              futureSelf={futureSelf}
            />
          </section>

          <section className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setFutureView("main");
                setFutureSelfError("");
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.08]"
            >
              VIEW FUTURE SELF
            </button>

            <button
              type="button"
              onClick={() => {
                setFutureView("whatif");
                setFutureSelfError("");
              }}
              className="rounded-2xl bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-white/90"
            >
              EXPLORE WHAT IF?
            </button>
          </section>

          <section className="mt-8">
            <FutureSelfChat
              futureSelf={futureSelf}
              onAsk={handleAskFutureSelf}
              disabled={chatLoading}
            />
          </section>
        </div>
      </main>
    );
  };

  /*
   * ---------------------------------------------------------
   * MAIN ROUTING
   * ---------------------------------------------------------
   */

  if (page === "intro") {
    return (
      <IntroPage
        onStart={handleStart}
      />
    );
  }

  if (page === "profile") {
    return (
      <ProfilePage
        value={profileText}
        onChange={setProfileText}
        onContinue={handleProfileContinue}
        onBack={handleProfileBack}
      />
    );
  }

  if (page === "game") {
    return (
      <GamePage
        profile={profile}
        gameState={gameState}
        scenario={scenario}
        selectedChoice={selectedChoice}
        consequence={consequence}
        onChoice={handleChoice}
        onContinue={handleContinue}
        onRestart={handleRestart}
      />
    );
  }

  if (page === "future") {
    return renderFutureSelfPage();
  }

  return null;
}

export default App;