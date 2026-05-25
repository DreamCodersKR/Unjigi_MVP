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
        "home-wake-toggle",
        enabled ? "home-wake-toggle--enabled" : "home-wake-toggle--disabled",
      ].join(" ")}
      aria-pressed={enabled}
    >
      <span>{enabled ? "[🎤 음성 동반자 ON]" : "[🎤 음성 동반자 OFF]"}</span>
    </button>
  );
}
