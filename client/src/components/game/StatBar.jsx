export default function StatBar({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-white/55">
          {icon}
          {label}
        </span>
        <span className="font-medium text-white/75">{value}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-white transition-all duration-700"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
