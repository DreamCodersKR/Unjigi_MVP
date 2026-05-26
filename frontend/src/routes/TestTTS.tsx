import { useMemo, useState } from "react";
import {
  classifyUserIntent,
  findMockCompanionResponse,
  getMockResponsesByIntent,
} from "@/services/companion";
import { getPreferredKoreanVoice, speak } from "@/services/tts";
import type { UserCompanionIntent } from "@/types/companion";

const SAMPLE_INPUTS = [
  "안녕",
  "근처 휴게소 있어?",
  "날씨 어때?",
  "비상 상황이야",
];

export default function TestTTS() {
  const [input, setInput] = useState(SAMPLE_INPUTS[0]);
  const [status, setStatus] = useState("대기 중");

  const intent = useMemo(() => classifyUserIntent(input), [input]);
  const response = useMemo(() => findMockCompanionResponse(input), [input]);
  const candidates = useMemo(
    () => getMockResponsesByIntent(intent as UserCompanionIntent),
    [intent]
  );
  const voice = getPreferredKoreanVoice();

  const handleSpeak = async () => {
    if (!response) {
      setStatus("매칭된 mock 응답 없음");
      return;
    }

    setStatus("음성 출력 중");

    try {
      await speak(response.response, response.audio_hint);
      setStatus("음성 출력 완료");
    } catch (error) {
      console.error("TestTTS speak failed", error);
      setStatus("음성 출력 실패");
    }
  };

  return (
    <main className="min-h-screen bg-white p-4">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <h1 className="text-xl font-bold text-zinc-900">TTS mock 테스트</h1>

        <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
          사용자 입력
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-24 rounded-md border border-zinc-300 p-3 text-base font-medium text-zinc-900"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_INPUTS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setInput(sample)}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700"
            >
              {sample}
            </button>
          ))}
        </div>

        <section className="rounded-md border border-zinc-200 p-3">
          <p className="text-sm font-semibold text-zinc-500">분류 intent</p>
          <p className="mt-1 text-base font-bold text-orange-600">{intent}</p>
        </section>

        <section className="rounded-md border border-zinc-200 p-3">
          <p className="text-sm font-semibold text-zinc-500">선택된 응답</p>
          <p className="mt-2 text-base font-semibold leading-7 text-zinc-900">
            {response?.response ?? "응답 없음"}
          </p>
          <p className="mt-2 text-xs font-medium text-zinc-500">
            후보 {candidates.length}개 / voice {voice?.name ?? "브라우저 기본"}
          </p>
        </section>

        <button
          type="button"
          onClick={handleSpeak}
          className="rounded-md bg-orange-500 px-4 py-3 text-base font-bold text-white active:bg-orange-600"
        >
          mock 응답 TTS 출력
        </button>

        <p className="text-sm font-semibold text-zinc-500">{status}</p>
      </div>
    </main>
  );
}
