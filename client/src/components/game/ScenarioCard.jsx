import { Clock3, Sparkles } from "lucide-react";

export default function ScenarioCard({ scenario, gameState }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/35 uppercase">
          <Sparkles size={14} />
          Scenario
        </span>

        <span className="inline-flex items-center gap-2 text-xs text-white/35">
          <Clock3 size={14} />
          Age {gameState.age} · Year {gameState.year}
        </span>
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
        {scenario.title}
      </h1>

      <p className="mt-5 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">
        {scenario.description}
      </p>
    </section>
  );
}
