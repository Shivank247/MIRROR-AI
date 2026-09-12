import { Activity, Brain, Coins, Heart, Zap } from "lucide-react";
import StatBar from "./StatBar";

const STAT_CONFIG = [
  { key: "career", label: "Career", icon: Activity },
  { key: "money", label: "Money", icon: Coins },
  { key: "relationships", label: "Relationships", icon: Heart },
  { key: "knowledge", label: "Knowledge", icon: Brain },
  { key: "energy", label: "Energy", icon: Zap },
  { key: "stress", label: "Stress", icon: Activity },
];

export default function GameHUD({ gameState }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] text-white/35 uppercase">
            Current Self
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl font-semibold">Age {gameState.age}</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
              Year {gameState.year}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs tracking-[0.2em] text-white/35 uppercase">
            Experience
          </p>
          <p className="mt-1 text-xl font-semibold">{gameState.xp} XP</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STAT_CONFIG.map(({ key, label, icon: Icon }) => (
          <StatBar
            key={key}
            label={label}
            value={gameState.stats[key]}
            icon={<Icon size={15} />}
          />
        ))}
      </div>
    </section>
  );
}
