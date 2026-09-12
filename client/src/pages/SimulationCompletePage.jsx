import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Sparkles,
} from "lucide-react";

export default function SimulationCompletePage({
  gameState,
  profile,
  onFutureSelf,
  onRestart,
}) {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 text-center shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <CheckCircle2 size={24} className="text-white/70" />
          </div>

          <p className="mt-6 text-xs font-semibold tracking-[0.3em] text-white/30 uppercase">
            Simulation Complete
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            You shaped a path.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            The decisions you made are now part of your simulated timeline.
            Your Future Self is waiting at the end of this path.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-white/25 uppercase">
                Age
              </p>

              <p className="mt-2 text-xl font-semibold text-white/80">
                {gameState.age}
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-white/25 uppercase">
                Decisions
              </p>

              <p className="mt-2 text-xl font-semibold text-white/80">
                {gameState.decisions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-white/25 uppercase">
                Experience
              </p>

              <p className="mt-2 text-xl font-semibold text-white/80">
                {gameState.xp} XP
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-left">
            <div className="flex items-start gap-3">
              <GitBranch
                size={17}
                className="mt-0.5 shrink-0 text-white/40"
              />

              <div>
                <p className="text-sm font-medium text-white/65">
                  {profile?.summary || "Your simulated journey"}
                </p>

                <p className="mt-1 text-xs leading-5 text-white/30">
                  Every decision became part of the path that brought you
                  here.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onFutureSelf}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              <Sparkles size={16} />
              Meet Your Future Self
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3.5 text-sm text-white/45 transition hover:border-white/25 hover:text-white"
            >
              Restart Simulation
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}