import { ArrowLeft, ArrowRight } from "lucide-react";
import VoiceInput from "../components/voice/VoiceInput";

export default function ProfilePage({
  value,
  onChange,
  onContinue,
  onBack,
}) {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center">
        <button
          type="button"
          onClick={onBack}
          className="mb-10 inline-flex w-fit items-center gap-2 text-sm text-white/40 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <p className="text-xs font-semibold tracking-[0.3em] text-white/35">
          CURRENT SELF · 01
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
          Who are you building toward?
        </h1>

        <p className="mt-4 max-w-xl text-white/50">
          Tell MIRROR//AI what matters to you. Speak naturally or type your
          answer.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-2xl sm:p-7">
          <label
            htmlFor="profile-goal"
            className="text-sm font-medium text-white/75"
          >
            What matters to you right now?
          </label>

          <textarea
            id="profile-goal"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Example: I want financial independence but also want time for my family."
            rows={5}
            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none placeholder:text-white/25 focus:border-white/30 focus:ring-2 focus:ring-white/10"
          />

          <div className="mt-5">
            <VoiceInput onTranscript={onChange} />
          </div>

          <button
            type="button"
            onClick={onContinue}
            disabled={!value.trim()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Create Current Self
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
