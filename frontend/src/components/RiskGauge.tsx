import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { CSSProperties } from 'react';
import "./RiskGauge.css";

interface Props {
  score: number;     // 0 ~ 100
  level: 'L1' | 'L2' | 'L3' | 'L4';
  compact?: boolean;
}

const LEVEL_COLORS = {
  L1: '#10B981',  // emerald-500
  L2: '#F59E0B',  // amber-500
  L3: '#F97316',  // orange-500
  L4: '#EF4444',  // red-500
};

const LEVEL_LABELS = {
  L1: '안전',
  L2: '주의',
  L3: '경고',
  L4: '위험',
};

export function RiskGauge({ score, level, compact = false }: Props) {
  const data = [{ score }];
  const color = LEVEL_COLORS[level];
  const sizeClass = compact ? 'compact' : 'default';

  return (
    <div
      className={`risk-gauge risk-gauge--${sizeClass}`}
      style={{ "--risk-gauge-color": color } as CSSProperties}
    >
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="score" fill={color} background={{ fill: '#E5E7EB' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="risk-gauge__label">
        <div className={`risk-gauge__score risk-gauge__score--${sizeClass}`}>{score}</div>
        <div className={`risk-gauge__level risk-gauge__level--${sizeClass}`}>
          {level} {LEVEL_LABELS[level]}
        </div>
      </div>
    </div>
  );
}
