import { useMemo, useState } from "react";
import {
  ArrowLeft,
  GitBranch,
  Sparkles,
  Split,
} from "lucide-react";
import { motion } from "framer-motion";
import { getAlternativeChoices } from "../../lib/counterfactualSimulator";

function FutureSelfWhatIf({
  gameState,
  onBack,
  onSimulate,
}) {
  const [selectedDecisionId, setSelectedDecisionId] = useState("");
  const [selectedChoiceId, setSelectedChoiceId] = useState("");
  const [error, setError] = useState("");

  const decisions = gameState?.decisions ?? [];

  const selectedDecision = useMemo(
    () =>
      decisions.find(
        (decision) => decision.id === selectedDecisionId,
      ),
    [decisions, selectedDecisionId],
  );

  const alternativeChoices = useMemo(
    () =>
      selectedDecisionId
        ? getAlternativeChoices({
            gameState,
            decisionId: selectedDecisionId,
          })
        : [],
    [gameState, selectedDecisionId],
  );

  const handleDecisionChange = (event) => {
    const decisionId = event.target.value;

    setSelectedDecisionId(decisionId);
    setSelectedChoiceId("");
    setError("");
  };

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoiceId(choiceId);
    setError("");
  };

  const handleSimulate = () => {
    if (!selectedDecisionId) {
      setError("Choose a decision to revisit.");
      return;
    }

    if (!selectedChoiceId) {
      setError("Choose the alternative path you want to explore.");
      return;
    }

    try {
      setError("");

      onSimulate({
        originalDecisionId: selectedDecisionId,
        alternativeChoiceId: selectedChoiceId,
      });
    } catch (simulationError) {
      setError(
        simulationError?.message ||
          "The alternate future could not be simulated.",
      );
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl"
      >
        {/* Header */}
        <div className="border-b border-white/10 px-5 py-6 sm:px-8">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white/80"
          >
            <ArrowLeft size={15} />
            Back to Future Self
          </button>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
              <Split size={19} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                Counterfactual Simulation
              </p>

              <h2 className="mt-2 text-2xl font-medium text-white sm:text-3xl">
                What if you chose differently?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Revisit one of your real decisions and explore the
                future created by another available choice.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 px-5 py-7 sm:px-8">
          {decisions.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
              <GitBranch
                size={22}
                className="mx-auto mb-4 text-white/40"
              />

              <p className="text-sm text-white/65">
                No decisions are available yet.
              </p>

              <p className="mt-2 text-xs text-white/35">
                Make a few choices in the simulation first.
              </p>
            </div>
          ) : (
            <>
              {/* Decision selector */}
              <div>
                <label
                  htmlFor="counterfactual-decision"
                  className="mb-3 block text-xs uppercase tracking-[0.18em] text-white/35"
                >
                  01 — Choose a decision
                </label>

                <select
                  id="counterfactual-decision"
                  value={selectedDecisionId}
                  onChange={handleDecisionChange}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white outline-none transition focus:border-white/25"
                >
                  <option value="">
                    Select a decision from your timeline
                  </option>

                  {decisions.map((decision) => (
                    <option
                      key={decision.id}
                      value={decision.id}
                    >
                      Age {decision.age} — {decision.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Original decision */}
              {selectedDecision && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <div className="flex items-center gap-2">
                    <GitBranch
                      size={15}
                      className="text-white/40"
                    />

                    <p className="text-xs uppercase tracking-[0.16em] text-white/30">
                      Original choice
                    </p>
                  </div>

                  <p className="mt-3 text-base text-white/80">
                    {selectedDecision.title}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/35">
                    This decision remains part of your original
                    timeline. What-If creates a separate simulation
                    branch and does not change your real gameplay state.
                  </p>
                </motion.div>
              )}

              {/* Alternative choices */}
              {selectedDecision && (
                <div>
                  <label
                    className="mb-3 block text-xs uppercase tracking-[0.18em] text-white/35"
                  >
                    02 — Choose another path
                  </label>

                  {alternativeChoices.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                      <p className="text-sm text-white/40">
                        No alternative choices are available for this
                        decision.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {alternativeChoices.map((choice) => {
                        const selected =
                          selectedChoiceId === choice.id;

                        return (
                          <button
                            key={choice.id}
                            type="button"
                            onClick={() =>
                              handleChoiceSelect(choice.id)
                            }
                            className={`rounded-2xl border p-4 text-left transition ${
                              selected
                                ? "border-white/40 bg-white/[0.1]"
                                : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-white/85">
                                  {choice.title}
                                </p>

                                <p className="mt-2 text-xs leading-5 text-white/40">
                                  {choice.description}
                                </p>

                                {/* Effects */}
                                {choice.effects &&
                                  Object.keys(choice.effects).length >
                                    0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                      {Object.entries(
                                        choice.effects,
                                      ).map(
                                        ([stat, value]) => (
                                          <span
                                            key={stat}
                                            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-white/40"
                                          >
                                            {stat}{" "}
                                            {value > 0
                                              ? `+${value}`
                                              : value}
                                          </span>
                                        ),
                                      )}
                                    </div>
                                  )}
                              </div>

                              {selected && (
                                <Sparkles
                                  size={16}
                                  className="shrink-0 text-white/70"
                                />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-5 text-white/55"
                >
                  {error}
                </motion.p>
              )}

              {/* Simulate */}
              <button
                type="button"
                onClick={handleSimulate}
                disabled={
                  !selectedDecisionId ||
                  !selectedChoiceId
                }
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <GitBranch size={16} />
                SIMULATE ALTERNATE FUTURE
              </button>

              <p className="text-center text-[11px] leading-5 text-white/25">
                This is a counterfactual simulation. Your original
                gameplay timeline will not be changed.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default FutureSelfWhatIf;