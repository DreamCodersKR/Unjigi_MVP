export type UserCompanionIntent =
  | "user_greeting"
  | "user_lounge_query"
  | "user_weather_query"
  | "user_emergency";

export type ProactiveCompanionIntent =
  | "proactive_long_drive"
  | "proactive_l3_warning";

export type CompanionIntent = UserCompanionIntent | ProactiveCompanionIntent;

export type CompanionAudioHint = {
  rate?: number;
  pitch?: number;
  tone?: string;
};

export type MockCompanionResponse = {
  id: string;
  intent: CompanionIntent;
  trigger: string | null;
  user_input: string | null;
  response: string;
  audio_hint?: CompanionAudioHint;
};
