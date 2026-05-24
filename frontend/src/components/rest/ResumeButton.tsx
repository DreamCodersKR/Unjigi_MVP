type ResumeButtonProps = {
  disabled?: boolean;
  isRecommended: boolean;
  onClick: () => void;
};

export function ResumeButton({
  disabled = false,
  isRecommended,
  onClick,
}: ResumeButtonProps) {
  return (
    <section className="border-b border-zinc-300 px-4 py-4 text-center">
      <button
        type="button"
        className={`
          w-full
          rounded-md
          border
          px-4
          py-3
          text-lg
          font-bold
          shadow-sm
          ${isRecommended
            ? "border-green-500 bg-green-600 text-white"
            : "border-orange-300 bg-orange-50 text-orange-700"}
        `}
        disabled={disabled}
        onClick={onClick}
      >
        🚛운행 재개
      </button>

      <p className="mt-3 text-xs font-medium text-zinc-400">
        30분 미만(MVP 20초 조정) 휴식 후 재개하면 경고가 표시됩니다.
      </p>
    </section>
  );
}
