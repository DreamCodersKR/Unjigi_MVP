export function RestTimer() {
  return (
    <section className="border-b border-zinc-300 text-center">
      <div className="px-4 py-3 text-sm font-medium text-zinc-500">
        ⏱ 휴식 시간
      </div>

      <div className="border-t border-zinc-200 px-4 py-3">
        <p className="text-3xl font-extrabold text-orange-700">00:23</p>
      </div>

      <div className="border-t border-zinc-200 px-4 py-2">
        <p className="text-xs font-medium text-zinc-500">
          (목표 휴식: 30분 이상)
        </p>
      </div>
    </section>
  );
}