type WakeWordToggleProps = {
  enabled?: boolean;
  onClick?: () => void;
};

export function WakeWordToggle({
  enabled = true,
  onClick,
}: WakeWordToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "mt-8 flex w-full items-center justify-center rounded-md border px-4 py-3 text-sm font-bold shadow-sm transition-colors",
        enabled
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100",
      ].join(" ")}
      aria-pressed={enabled}
    >
      <span>{enabled ? "[🎤 음성 동반자 ON]" : "[🎤 음성 동반자 OFF]"}</span>
    </button>
  );
}