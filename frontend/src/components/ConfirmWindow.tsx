import "./ConfirmWindow.css";

interface ConfirmWindowProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmWindow({
  open,
  message,
  onConfirm,
  onCancel,
}: ConfirmWindowProps) {
  if (!open) return null;

  return (
    <div className="confirm-window">
      <div className="confirm-window__panel">
        <p className="confirm-window__message">
          {message}
        </p>

        <div className="confirm-window__actions">
          <button
            onClick={onCancel}
            className="confirm-window__button confirm-window__button--cancel"
          >
            취소
          </button>

          <button
            onClick={onConfirm}
            className="confirm-window__button confirm-window__button--confirm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
