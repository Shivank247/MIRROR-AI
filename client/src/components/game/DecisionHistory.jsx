import { CheckCircle2, Clock3, GitCommitHorizontal } from "lucide-react";

export default function DecisionHistory({ decisions }) {
  if (!decisions?.length) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
        <div className="flex items-center gap-2">
          <GitCommitHorizontal size={16} className="text-white/45" />

          <h2 className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
            Decision History
          </h2>
        </div>

        <p className="mt-6 text-sm leading-6 text-white/30">
          Your decisions will appear here as you shape your path.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <GitCommitHorizontal size={16} className="text-white/45" />

        <h2 className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
          Decision History
        </h2>
      </div>

      <div className="mt-7 space-y-4">
        {decisions.map((decision, index) => (
          <article
            key={decision.id}
            className="rounded-2xl border border-white/8 bg-black/20 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 text-white/50">
                <CheckCircle2 size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-[0.12em] text-white/30 uppercase">
                    Decision {String(index + 1).padStart(2, "0")}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs text-white/25">
                    <Clock3 size={12} />
                    Age {decision.age}
                  </span>
                </div>

                <h3 className="mt-2 text-sm font-medium text-white/80">
                  {decision.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/30">
                  This decision became part of your simulated timeline.
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}