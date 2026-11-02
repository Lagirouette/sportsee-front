import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  done: number;
  goal: number;
}

export default function WeeklyGoalChart({ done, goal }: Props) {
  const data = [
    { name: "réalisées", value: done },
    { name: "restants", value: Math.max(goal - done, 0) },
  ];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="45%"
          outerRadius="80%"
          startAngle={90}
          endAngle={-270}
          stroke="none"
          labelLine={false}
          label={({ name, value }) => `${value} ${name}`}
        >
          <Cell fill="#0B23F4" />
          <Cell fill="#B6BDFC" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}