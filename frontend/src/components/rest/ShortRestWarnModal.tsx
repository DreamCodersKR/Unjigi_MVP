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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
        <h2 className="text-lg font-bold text-zinc-900">
          아직 휴식 시간이 짧아요
        </h2>

        <p className="mt-3 text-sm font-medium text-zinc-500">
          30분 미만 휴식 후 운행을 재개하면 위험도가 다시 높아질 수 있습니다.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-bold text-zinc-700"
          >
            조금 더 쉬기
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-white"
          >
            그래도 재개
          </button>
        </div>
      </div>
    </div>
  );
}
