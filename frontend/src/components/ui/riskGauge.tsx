import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
 
interface Props {
  score: number;     // 0 ~ 100
  level: 'L1' | 'L2' | 'L3' | 'L4';
}
 
const LEVEL_COLORS = {
  L1: '#10B981',  // emerald-500
  L2: '#F59E0B',  // amber-500
  L3: '#F97316',  // orange-500
  L4: '#EF4444',  // red-500
};
 
const LEVEL_LABELS = {
  L1: '안전', L2: '주의', L3: '경고', L4: '위험',
};

export function RiskGauge({ score, level }: Props) {
  const data = [{ score }];
  const color = LEVEL_COLORS[level];
 
  return (
    <div className="relative w-60 h-60 mx-auto">
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius="70%" outerRadius="100%"
          data={data} startAngle={180} endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="score" fill={color} background={{ fill: '#E5E7EB' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-bold" style={{ color }}>{score}</div>
        <div className="text-xl font-semibold mt-2" style={{ color }}>
          {level} {LEVEL_LABELS[level]}
        </div>
      </div>
    </div>
  );
}
