import type {
  ListenOnceOptions,
  SpeechRecognitionErrorCode,
  SpeechRecognitionWindow,
} from "@/types/stt";

export class SpeechRecognitionUnavailableError extends Error {
  constructor() {
    super("Speech recognition is not supported in this browser.");
    this.name = "SpeechRecognitionUnavailableError";
  }
}

export class SpeechRecognitionTimeoutError extends Error {
  constructor() {
    super("Speech recognition timed out.");
    this.name = "SpeechRecognitionTimeoutError";
  }
}

export class SpeechRecognitionFailedError extends Error {
  code: SpeechRecognitionErrorCode | string;

  constructor(code: SpeechRecognitionErrorCode | string) {
    super(`Speech recognition failed: ${code}`);
    this.name = "SpeechRecognitionFailedError";
    this.code = code;
  }
}

const DEFAULT_LISTEN_TIMEOUT_MS = 10_000;

export function isSpeechRecognitionSupported() {
  const speechWindow = window as SpeechRecognitionWindow;
  return Boolean(
    speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition
  );
}

function createSpeechRecognition() {
  const speechWindow = window as SpeechRecognitionWindow;
  const SpeechRecognition =
    speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    throw new SpeechRecognitionUnavailableError();
  }

  return new SpeechRecognition();
}

export function listenOnce({
  lang = "ko-KR",
  timeoutMs = DEFAULT_LISTEN_TIMEOUT_MS,
}: ListenOnceOptions = {}) {
  return new Promise<string>((resolve, reject) => {
    let settled = false;
    let activeRecognition: ReturnType<typeof createSpeechRecognition> | null = null;
    let shouldRestartAfterNoSpeech = false;
    let lastTranscript = "";

    const timeoutId = window.setTimeout(() => {
      finish(() => {
        activeRecognition?.abort();
        reject(new SpeechRecognitionTimeoutError());
      });
    }, timeoutMs);

    function finish(callback: () => void) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      if (activeRecognition) {
        activeRecognition.onresult = null;
        activeRecognition.onerror = null;
        activeRecognition.onend = null;
      }
      callback();
    }

    function startRecognition() {
      if (settled) return;

      const recognition = createSpeechRecognition();
      activeRecognition = recognition;

      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const latestResult = event.results[event.results.length - 1];
        const transcript = latestResult?.[0]?.transcript?.trim();

        if (transcript) {
          lastTranscript = transcript;
        }

        if (!latestResult?.isFinal) return;

        finish(() => {
          if (lastTranscript) {
            resolve(lastTranscript);
            return;
          }

          reject(new SpeechRecognitionTimeoutError());
        });
      };

      recognition.onerror = (event) => {
        if (event.error === "no-speech") {
          shouldRestartAfterNoSpeech = true;
          return;
        }

        finish(() => {
          reject(new SpeechRecognitionFailedError(event.error ?? "unknown"));
        });
      };

      recognition.onend = () => {
        if (shouldRestartAfterNoSpeech && !settled) {
          shouldRestartAfterNoSpeech = false;
          window.setTimeout(startRecognition, 100);
          return;
        }

        finish(() => {
          if (lastTranscript) {
            resolve(lastTranscript);
            return;
          }

          reject(new SpeechRecognitionTimeoutError());
        });
      };

      try {
        recognition.start();
      } catch (error) {
        finish(() => {
          reject(error);
        });
      }
    }

    startRecognition();
  });
}
