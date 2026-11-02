import { Bar, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyHeartRatePoint } from "~/models/activity";

export default function HeartRateChart({ data }: { data: DailyHeartRatePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="day" tickLine={false} />
        <YAxis domain={["dataMin - 10", "dataMax + 5"]} tickLine={false} />
        <Tooltip formatter={(value, name) => [`${value} BPM`, name]} cursor={{ fill: "rgba(0, 0, 0, 0.04)" }} />
        <Legend iconType="circle" align="left" />
        <Bar dataKey="min" name="Min" fill="#FCC1B6" barSize={14} radius={[30, 30, 30, 30]} />
        <Bar dataKey="max" name="Max BPM" fill="#F4320B" barSize={14} radius={[30, 30, 30, 30]} />
        <Line
          type="monotone"
          dataKey="avg"
          name="BPM moyen"
          stroke="#B6BDFC"
          strokeWidth={2}
          dot={{ r: 3, fill: "#0B23F4", stroke: "none" }}
          connectNulls
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}