export function Greeting() {
  return (
      <section className="relative overflow-hidden rounded-lg border border-orange-100 bg-gradient-to-r from-orange-50/80 via-white to-white px-4 py-5 shadow-sm">
        <div className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-orange-400" />
        <div className="relative">
          <p className="text-lg font-extrabold tracking-normal text-zinc-900">
            안녕하세요, 김기사님
          </p>
          <p className="mt-2 text-sm font-medium tracking-normal text-zinc-500">
            오늘도 안전운행 하세요
          </p>
        </div>
      </section>
  );
}
