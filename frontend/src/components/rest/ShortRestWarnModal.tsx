type ShortRestWarnModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ShortRestWarnModal({
  open,
  onCancel,
  onConfirm,
}: ShortRestWarnModalProps) {
  if (!open) return null;

  return (
    <div className="short-rest-modal">
      <div className="short-rest-modal__panel">
        <h2 className="short-rest-modal__title">
          아직 휴식 시간이 짧아요
        </h2>

        <p className="short-rest-modal__message">
          30분 미만 휴식 후 운행을 재개하면 위험도가 다시 높아질 수 있습니다.
        </p>

        <div className="short-rest-modal__actions">
          <button
            type="button"
            onClick={onCancel}
            className="short-rest-modal__button short-rest-modal__button--cancel"
          >
            조금 더 쉬기
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="short-rest-modal__button short-rest-modal__button--confirm"
          >
            그래도 재개
          </button>
        </div>
      </div>
    </div>
  );
}
