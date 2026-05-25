type ResumeButtonProps = {
  disabled?: boolean;
  isRecommended: boolean;
  label: string;
  onClick: () => void;
};

export function ResumeButton({
  disabled = false,
  isRecommended,
  label,
  onClick,
}: ResumeButtonProps) {
  return (
    <section className="rest-area-section rest-area-resume">
      <button
        type="button"
        className={[
          "rest-area-resume__button",
          isRecommended
            ? "rest-area-resume__button--recommended"
            : "rest-area-resume__button--warning",
        ].join(" ")}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
      <p className="rest-area-resume__hint">
        30분 미만 휴식 후 재개하면 경고가 표시됩니다.
      </p>
    </section>
  );
}
