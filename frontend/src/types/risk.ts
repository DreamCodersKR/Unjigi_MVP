export type RiskLevel = 'L1' | 'L2' | 'L3' | 'L4';

export interface RiskFactor {
  type: 'long_drive' | 'night_time' | 'erratic_pattern' | 'weather' | 'consecutive';
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export interface RiskBreakdown {
  rule_based: number;
  lstm_based: number;
  weight_rule: number;
  weight_lstm: number;
  model_status: 'rule_only' | 'rule_with_lstm' | 'lstm_anomaly';
}

export interface RecommendedAction {
  type: 'rest' | 'continue' | 'emergency';
  nearest_lounge_id: string | null;
  nearest_lounge_distance_km: number | null;
}

export interface RiskResponse {
  score: number;
  level: RiskLevel;
  updated_at: string;
  trip_started_at: string;
  history: { timestamp: number; score: number }[];
  breakdown: RiskBreakdown;
  factors: RiskFactor[];
  recommended_action: RecommendedAction;
  data_source: 'phone_only' | 'phone_with_device' | 'device_only';
  data_quality: 'limited' | 'device_attached' | 'full';
}
