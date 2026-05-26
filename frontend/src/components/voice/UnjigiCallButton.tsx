import { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import { findMockCompanionResponse } from "@/services/companion";
import {
  listenOnce,
  SpeechRecognitionFailedError,
  SpeechRecognitionUnavailableError,
} from "@/services/stt";
import { speak } from "@/services/tts";
import "./UnjigiCallButton.css";

type CallState =
  | "idle"
  | "prompting"
  | "listening"
  | "processing"
  | "speaking"
  | "error";

const PROMPT_MESSAGE = "네 기사님, 말씀하세요?";
const STT_FALLBACK_MESSAGE = "잘 못 들었어요. 다시 시도해 주세요.";
const STT_PERMISSION_MESSAGE =
  "마이크 권한을 확인한 뒤 다시 시도해 주세요.";
const STT_UNSUPPORTED_MESSAGE =
  "이 브라우저에서는 음성 인식을 지원하지 않아요.";
const LISTEN_TIMEOUT_MS = 10_000;

const STATE_LABELS: Record<CallState, string> = {
  idle: "운지기 호출",
  prompting: "운지기 호출 중",
  listening: "듣는 중",
  processing: "응답 찾는 중",
  speaking: "답변 중",
  error: "다시 호출",
};

export function UnjigiCallButton() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [lastTranscript, setLastTranscript] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [micLevel, setMicLevel] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(
    LISTEN_TIMEOUT_MS / 1000
  );
  const isBusy = !["idle", "error"].includes(callState);
  const visualMicLevel = Math.min(micLevel * 2.5, 100);

  useEffect(() => {
    if (callState !== "listening") {
      setRemainingSeconds(LISTEN_TIMEOUT_MS / 1000);
      return;
    }

    const startedAt = Date.now();

    const updateRemainingSeconds = () => {
      const elapsedMs = Date.now() - startedAt;
      const nextRemainingSeconds = Math.max(
        Math.ceil((LISTEN_TIMEOUT_MS - elapsedMs) / 1000),
        0
      );
      setRemainingSeconds(nextRemainingSeconds);
    };

    updateRemainingSeconds();
    const timerId = window.setInterval(updateRemainingSeconds, 250);

    return () => {
      window.clearInterval(timerId);
    };
  }, [callState]);

  useEffect(() => {
    if (callState !== "listening") {
      setMicLevel(0);
      setMicError(null);
      return;
    }

    let animationFrameId = 0;
    let audioContext: AudioContext | null = null;
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function startMicMeter() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) return;

        audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const data = new Uint8Array(analyser.fftSize);
        let smoothedLevel = 0;

        function tick() {
          analyser.getByteTimeDomainData(data);

          const sum = data.reduce((total, value) => {
            const normalized = (value - 128) / 128;
            return total + normalized * normalized;
          }, 0);
          const rms = Math.sqrt(sum / data.length);
          const nextLevel = Math.min(Math.round(rms * 220), 100);

          smoothedLevel = smoothedLevel * 0.75 + nextLevel * 0.25;
          setMicLevel(Math.round(smoothedLevel));
          animationFrameId = window.requestAnimationFrame(tick);
        }

        tick();
      } catch (error) {
        setMicError(error instanceof Error ? error.name : "MicUnavailable");
      }
    }

    startMicMeter();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      stream?.getTracks().forEach((track) => track.stop());
      void audioContext?.close();
    };
  }, [callState]);

  const handleCall = async () => {
    if (isBusy) return;

    try {
      setLastError(null);
      setCallState("prompting");
      await speak(PROMPT_MESSAGE);

      setCallState("listening");
      const transcript = await listenOnce({ timeoutMs: LISTEN_TIMEOUT_MS });
      setLastTranscript(transcript);

      setCallState("processing");
      const response = findMockCompanionResponse(transcript);

      setCallState("speaking");
      if (response) {
        await speak(response.response, response.audio_hint);
      } else {
        await speak(STT_FALLBACK_MESSAGE);
      }

      setLastTranscript(null);
      setCallState("idle");
    } catch (error) {
      console.error("UnjigiCallButton failed", error);
      setCallState("error");

      if (error instanceof SpeechRecognitionUnavailableError) {
        setLastError("STT unsupported");
        await speak(STT_UNSUPPORTED_MESSAGE);
        return;
      }

      if (error instanceof SpeechRecognitionFailedError) {
        setLastError(error.code);

        if (["not-allowed", "service-not-allowed", "audio-capture"].includes(error.code)) {
          await speak(STT_PERMISSION_MESSAGE);
          return;
        }
      } else if (error instanceof Error) {
        setLastError(error.name);
      }

      await speak(STT_FALLBACK_MESSAGE);
    }
  };

  return (
    <div className="unjigi-call">
      <button
        type="button"
        onClick={handleCall}
        disabled={isBusy}
        style={
          callState === "listening"
            ? { "--unjigi-call-level": `${visualMicLevel}%` } as React.CSSProperties
            : undefined
        }
        className={[
          "unjigi-call__button",
          isBusy ? "unjigi-call__button--busy" : "",
          callState === "listening" ? "unjigi-call__button--listening" : "",
        ].join(" ")}
      >
        <Mic className="unjigi-call__icon" aria-hidden="true" />
        <span>{STATE_LABELS[callState]}</span>
      </button>

      {callState === "listening" ? (
        <div className="unjigi-call__meter">
          <p className="unjigi-call__status">
            {remainingSeconds}초 동안 말씀하세요.
          </p>
          {micError ? (
            <p className="unjigi-call__error">마이크 입력 확인 실패: {micError}</p>
          ) : null}
        </div>
      ) : null}

      {lastTranscript ? (
        <p className="unjigi-call__transcript">"{lastTranscript}"</p>
      ) : null}

      {lastError ? (
        <p className="unjigi-call__error">STT 실패: {lastError}</p>
      ) : null}
    </div>
  );
}
