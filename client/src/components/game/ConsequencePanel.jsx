import { ArrowRight, Clock3, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import VoiceOutput from "../voice/VoiceOutput";

export default function ConsequencePanel({
  consequence,
  onContinue,
}) {
  if (!consequence) return null;

  return (
    <section className="rounded-3xl border border-white/15 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
        <Sparkles size={14} />
        Consequence
      </div>

      <h2 className="mt-4 text-2xl font-semibold">
        You chose: {consequence.choice.title}
      </h2>

      <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-4">
        <p className="text-sm leading-7 text-white/60">
          {consequence.narrative}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {consequence.changes.map((change) => (
          <div
            key={change.name}
            className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3"
          >
            <span className="text-sm text-white/50">{change.name}</span>

            <span
              className={[
                "flex items-center gap-1 text-sm font-semibold",
                change.delta >= 0 ? "text-white" : "text-white/45",
              ].join(" ")}
            >
              {change.delta >= 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {change.delta > 0 ? "+" : ""}
              {change.delta}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/40">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
          <Clock3 size={13} />
          +{consequence.yearsAdvanced} year
          {consequence.yearsAdvanced === 1 ? "" : "s"}
        </span>

        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
          <Sparkles size={13} />
          +{consequence.xpGained} XP
        </span>
      </div>

      <div className="mt-6">
        <VoiceOutput text={consequence.narrative} />
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5"
      >
        Continue Your Story
        <ArrowRight size={16} />
      </button>
    </section>
  );
}
