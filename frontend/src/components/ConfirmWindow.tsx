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
    <div>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[320px] rounded-xl bg-white p-6 shadow-xl">
        <p className="text-center text-lg font-medium">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border px-4 py-2"
          >
            취소
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
