import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "The simulation could not complete this step.",
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-center"
    >
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60">
        <AlertTriangle size={20} />
      </div>

      <h2 className="mt-5 text-lg font-medium text-white/85">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/35">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
        >
          <RefreshCw size={15} />
          Try Again
        </button>
      )}
    </div>
  );
}
