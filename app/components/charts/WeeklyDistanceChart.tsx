import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { WeeklyDistancePoint } from "~/models/activity";

export default function WeeklyDistanceChart({ data }: { data: WeeklyDistancePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="label" tickLine={false} />
        <YAxis tickLine={false} allowDecimals={false} />
        <Tooltip formatter={(value) => [`${value} km`, "Distance"]} cursor={{ fill: "rgba(0, 0, 0, 0.04)" }} />
        <Legend iconType="circle" align="left" />
        <Bar dataKey="km" name="Km" fill="#B6BDFC" barSize={14} radius={[30, 30, 30, 30]} />
      </BarChart>
    </ResponsiveContainer>
  );
}