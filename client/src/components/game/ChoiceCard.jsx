import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ChoiceCard({
  choice,
  index,
  disabled,
  selected,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={!disabled ? { y: -3 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      className={[
        "group w-full rounded-2xl border p-5 text-left transition",
        selected
          ? "border-white/40 bg-white/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.045]",
        disabled && !selected
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-white/45">
          {index + 1}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-white">{choice.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/40">
            {choice.description}
          </p>
        </div>

        <ArrowRight
          size={17}
          className="mt-1 shrink-0 text-white/25 transition group-hover:translate-x-1 group-hover:text-white/70"
        />
      </div>
    </motion.button>
  );
}
