import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
 
interface Props {
  data: { timestamp: number; score: number }[];
  height?: number;
}
 
export function RiskSparkline({ data, height = 100 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(ts) => new Date(ts * 1000).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        />
        <YAxis domain={[0, 100]} hide />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#F97316"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
