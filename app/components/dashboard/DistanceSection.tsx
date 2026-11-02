import WeeklyDistanceChart from "~/components/charts/WeeklyDistanceChart";
import ChartCard from "~/components/ui/ChartCard";
import DataState from "~/components/ui/DataState";
import PeriodNav from "~/components/ui/PeriodNav";
import { useUserActivity } from "~/hooks/useUserActivity";
import { useWeekRange } from "~/hooks/useWeekRange";
import { averageWeeklyKm, getWeeklyDistance } from "~/models/activity";

const WEEKS = 4;

export default function DistanceSection() {
  const range = useWeekRange(WEEKS);
  const { data, loading, error, reload } = useUserActivity(range.start, range.end);
  const points = data ? getWeeklyDistance(data, range.start, WEEKS) : [];

  return (
    <ChartCard
      title={data ? `${averageWeeklyKm(points)}km en moyenne` : "—"}
      subtitle="Total des kilomètres 4 dernières semaines"
      nav={<PeriodNav {...range} />}
    >
      <DataState loading={loading} error={error} hasData={!!data} onRetry={reload}>
        <WeeklyDistanceChart data={points} />
      </DataState>
    </ChartCard>
  );
}