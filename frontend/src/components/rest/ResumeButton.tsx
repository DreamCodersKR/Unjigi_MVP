export function ResumeButton() {
  return (
    <section className="border-b border-zinc-300 px-4 py-4 text-center">
      <button
        type="button"
        className="
          w-full
          rounded-md
          border
          border-zinc-300
          bg-zinc-100
          px-4
          py-3
          text-base
          font-bold
          text-zinc-600
          shadow-sm
        "
        disabled
      >
        [✅ 7분 더 쉬세요]
      </button>

      <p className="mt-3 text-xs font-medium text-zinc-400">
        (30분 미만 시 회색, 30분 후 초록 “휴식 완료 → 운행 재개”)
      </p>
    </section>
  );
}