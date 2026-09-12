import {
  Circle,
  Flag,
  GitBranch,
  Sparkles,
  Star,
} from "lucide-react";
import EmptyState from "../ui/EmptyState";

const EVENT_LABELS = {
  decision: "Decision",
  event: "Event",
  milestone: "Milestone",
  future: "Future",
};

export default function Timeline({ events }) {
  if (!events?.length) {
    return (
      <EmptyState
        title="Your timeline is waiting"
        description="Make your first decision and MIRROR//AI will begin recording your journey."
      />
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

          const eventLabel =
            EVENT_LABELS[event.type] || "Life Event";

          const importance =
            typeof event.importance === "number"
              ? Math.max(0, Math.min(5, event.importance))
              : 0;

          return (
            <div
              key={event.id}
              className="relative flex gap-4"
            >
              {!isLast && (
                <div className="absolute left-[7px] top-5 h-full w-px bg-white/10" />
              )}

              <div className="relative z-10 mt-1 shrink-0">
                {event.type === "milestone" ? (
                  <Flag
                    size={15}
                    className="text-white/65"
                  />
                ) : event.type === "decision" ? (
                  <GitBranch
                    size={15}
                    className="text-white/55"
                  />
                ) : event.type === "future" ? (
                  <Sparkles
                    size={15}
                    className="text-white/55"
                  />
                ) : (
                  <Circle
                    size={15}
                    className="fill-white/10 text-white/45"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 pb-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-xs tracking-[0.12em] text-white/30 uppercase">
                    Age {event.age}
                  </p>

                  {typeof event.year === "number" && (
                    <span className="text-xs text-white/20">
                      Year {event.year}
                    </span>
                  )}

                  <span className="rounded-full border border-white/8 px-2 py-0.5 text-[10px] tracking-[0.1em] text-white/25 uppercase">
                    {eventLabel}
                  </span>
                </div>

                <h3 className="mt-2 text-sm font-medium text-white/80">
                  {event.title}
                </h3>

                {event.description && (
                  <p className="mt-1 text-sm leading-6 text-white/35">
                    {event.description}
                  </p>
                )}

                {importance > 0 && (
                  <div className="mt-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={11}
                        className={
                          starIndex < importance
                            ? "fill-white/40 text-white/40"
                            : "text-white/10"
                        }
                      />
                    ))}

                    <span className="ml-1 text-[10px] text-white/20">
                      Importance
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}