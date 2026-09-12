import {
  ArrowRight,
  CalendarDays,
  Clock3,
  GitBranch,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import VoiceOutput from "../voice/VoiceOutput";

export default function ConsequencePanel({
  consequence,
  onContinue,
}) {
  if (!consequence) return null;

  const currentAge = consequence.gameState?.age;
  const currentYear = consequence.gameState?.year;

  return (
    <section className="rounded-3xl border border-white/15 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
          <Sparkles size={14} />
          Consequence
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-white/30 uppercase">
          Path Updated
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        You chose: {consequence.choice.title}
      </h2>

      <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-4">
        <p className="text-sm leading-7 text-white/60">
          {consequence.narrative}
        </p>
      </div>

      <div className="mt-7">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-white/40" />

          <p className="text-xs font-semibold tracking-[0.18em] text-white/35 uppercase">
            Your life changed
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {consequence.changes.map((change) => {
            const isPositive = change.delta >= 0;

            return (
              <div
                key={change.name}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3"
              >
                <span className="text-sm text-white/50">
                  {change.name}
                </span>

                <span
                  className={[
                    "flex items-center gap-1 text-sm font-semibold",
                    isPositive ? "text-white" : "text-white/45",
                  ].join(" ")}
                >
                  {isPositive ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}

                  {change.delta > 0 ? "+" : ""}
                  {change.delta}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-white/30">
            <Clock3 size={14} />

            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">
              Time
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold text-white/80">
            +{consequence.yearsAdvanced} year
            {consequence.yearsAdvanced === 1 ? "" : "s"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-white/30">
            <CalendarDays size={14} />

            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">
              New Chapter
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold text-white/80">
            Age {currentAge}
          </p>

          <p className="mt-0.5 text-xs text-white/25">
            Year {currentYear}
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-white/30">
            <Sparkles size={14} />

            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">
              Experience
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold text-white/80">
            +{consequence.xpGained} XP
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
        <GitBranch size={15} className="shrink-0 text-white/35" />

        <p className="text-xs leading-5 text-white/35">
          This decision has been recorded in your timeline. Your next
          situation will begin from this new state.
        </p>
      </div>

      <div className="mt-6">
        <VoiceOutput text={consequence.narrative} />
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
      >
        Continue Your Story
        <ArrowRight size={16} />
      </button>
    </section>
  );
}