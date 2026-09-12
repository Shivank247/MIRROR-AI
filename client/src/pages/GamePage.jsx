import { RotateCcw } from "lucide-react";
import GameHUD from "../components/game/GameHUD";
import ScenarioCard from "../components/game/ScenarioCard";
import ChoiceCard from "../components/game/ChoiceCard";
import ConsequencePanel from "../components/game/ConsequencePanel";
import Timeline from "../components/timeline/Timeline";

export default function GamePage({
  profile,
  gameState,
  scenario,
  scenarioIndex,
  selectedChoice,
  consequence,
  onChoice,
  onContinue,
  onRestart,
}) {
  const totalScenarios = 3;
  const progress = Math.min(
    100,
    ((scenarioIndex + (consequence ? 1 : 0)) / totalScenarios) * 100,
  );

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* GAME HEADER */}
        <header className="mb-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-white/30">
                MIRROR//AI
              </p>

              <p className="mt-1 max-w-xl truncate text-xs text-white/25">
                {profile?.summary || "Your simulated life"}
              </p>
            </div>

            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/40 transition hover:border-white/25 hover:text-white"
            >
              <RotateCcw size={14} />
              Restart
            </button>
          </div>

          {/* PROGRESSION */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-[10px] font-semibold tracking-[0.18em] text-white/30 uppercase">
              <span>Life Simulation</span>
              <span>
                Chapter {String(Math.min(scenarioIndex + 1, totalScenarios)).padStart(2, "0")} / {String(totalScenarios).padStart(2, "0")}
              </span>
            </div>

            <div className="h-px overflow-hidden bg-white/10">
              <div
                className="h-full bg-white transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <GameHUD gameState={gameState} />

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">

              <ScenarioCard
                scenario={scenario}
                gameState={gameState}
              />

              {!consequence ? (
                <section className="space-y-3">

                  <div className="px-1">
                    <p className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">
                      What do you do?
                    </p>

                    <p className="mt-1 text-sm text-white/30">
                      Every choice changes the path.
                    </p>
                  </div>

                  {scenario.choices.map((choice, index) => (
                    <ChoiceCard
                      key={choice.id}
                      choice={choice}
                      index={index}
                      disabled={Boolean(selectedChoice)}
                      selected={selectedChoice === choice.id}
                      onClick={() => onChoice(choice)}
                    />
                  ))}
                </section>
              ) : (
                <ConsequencePanel
                  consequence={consequence}
                  onContinue={onContinue}
                />
              )}

            </div>

            <aside>
              <Timeline events={gameState.timeline} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
