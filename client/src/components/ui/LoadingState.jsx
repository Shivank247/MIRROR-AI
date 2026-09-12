import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingState({
  title = "Processing...",
  description = "MIRROR//AI is processing your next step.",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[220px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="text-white/70"
      >
        <LoaderCircle size={28} />
      </motion.div>

      <h2 className="mt-5 text-lg font-medium text-white/85">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
        {description}
      </p>
    </div>
  );
}
