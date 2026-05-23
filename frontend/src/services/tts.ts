type SpeakOptions = {
  rate?: number;
  pitch?: number;
};

export function speak(
    text: string, 
    options: SpeakOptions = {}
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = options?.rate ?? 1.0;
    u.pitch = options?.pitch ?? 1.0;
    //u.voice = getKoreanFemaleVoice() ?? null;
    u.voice = null;
    u.onend = () => resolve();
    u.onerror = reject;
    window.speechSynthesis.speak(u);
  });
}
