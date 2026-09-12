import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function IntroPage({ onStart }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs tracking-[0.2em] text-white/50 uppercase">
            <Sparkles size={13} />
            Play your possibilities
          </div>

          <p className="text-sm font-semibold tracking-[0.35em] text-white/45">
            MIRROR//AI
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            You don&apos;t choose your future.
            <span className="mt-2 block text-white/40">
              You build it through your decisions.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
            An AI-powered playable life simulation where your choices shape
            the life you experience.
          </p>

          <motion.button
            type="button"
            onClick={onStart}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            ENTER YOUR LIFE
            <ArrowRight size={17} />
          </motion.button>

          <p className="mt-5 text-xs text-white/30">
            Your future is simulated, not predicted.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
