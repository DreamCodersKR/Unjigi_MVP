type ShortRestWarnModalProps = {
  open: boolean;
};

export function ShortRestWarnModal({ open }: ShortRestWarnModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
        <h2 className="text-lg font-bold text-zinc-900">
          아직 휴식 시간이 짧아요
        </h2>

        <p className="mt-3 text-sm font-medium text-zinc-500">
          30분 미만 휴식 후 운행을 재개하면 위험도가 올라갈 수 있습니다.
        </p>

        <button
          type="button"
          className="mt-5 w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}