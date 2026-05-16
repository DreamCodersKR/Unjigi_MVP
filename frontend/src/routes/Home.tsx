import { Link } from "react-router-dom";
import { useEffect } from "react";
import { dbping } from "@/api/lounges";

export default function Home() {
  useEffect(() => {
    dbping();
  }, []);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">운지기 홈</h1>
        <Link
          to="/risk"
          className="rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        >
          졸음운전 감지
        </Link>
        <Link
          to="/map"
          className="rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        >
          라운지 & 졸음쉼터 안내
        </Link>
      </div>
    </div>
  );
}