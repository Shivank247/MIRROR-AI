import { CircleDashed } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Your choices will create this part of your story.",
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/40">
        <CircleDashed size={20} />
      </div>

      <h2 className="mt-5 text-lg font-medium text-white/75">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/30">
        {description}
      </p>
    </div>
  );
}
