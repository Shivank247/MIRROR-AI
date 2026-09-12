import { Circle, Flag, GitBranch } from "lucide-react";

export default function Timeline({ events }) {
  if (!events?.length) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <p className="text-sm text-white/35">
          Your timeline will appear here as you make decisions.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <GitBranch size={16} className="text-white/45" />
        <h2 className="text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
          Your Timeline
        </h2>
      </div>

      <div className="mt-7 space-y-0">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;

          return (
            <div key={event.id} className="relative flex gap-4">
              {!isLast && (
                <div className="absolute left-[7px] top-5 h-full w-px bg-white/10" />
              )}

              <div className="relative z-10 mt-1">
                {event.type === "milestone" ? (
                  <Flag size={15} className="text-white/65" />
                ) : (
                  <Circle size={15} className="fill-white/10 text-white/45" />
                )}
              </div>

              <div className="pb-7">
                <p className="text-xs tracking-[0.12em] text-white/30 uppercase">
                  Age {event.age}
                </p>
                <h3 className="mt-1 text-sm font-medium text-white/80">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="mt-1 text-sm leading-6 text-white/35">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
