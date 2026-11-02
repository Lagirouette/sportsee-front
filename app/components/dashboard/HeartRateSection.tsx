import HeartRateChart from "~/components/charts/HeartRateChart";
import ChartCard from "~/components/ui/ChartCard";
import DataState from "~/components/ui/DataState";
import PeriodNav from "~/components/ui/PeriodNav";
import { useUserActivity } from "~/hooks/useUserActivity";
import { useWeekRange } from "~/hooks/useWeekRange";
import { averageHeartRate, getDailyHeartRate } from "~/models/activity";

export default function HeartRateSection() {
  const range = useWeekRange(1);
  const { data, loading, error, reload } = useUserActivity(range.start, range.end);
  const points = data ? getDailyHeartRate(data, range.start) : [];
  const average = data ? averageHeartRate(data) : null;

  return (
    <ChartCard
      title={average ? `${average} BPM` : "— BPM"}
      subtitle="Fréquence cardiaque moyenne"
      accent="red"
      nav={<PeriodNav {...range} />}
    >
      <DataState loading={loading} error={error} hasData={!!data} onRetry={reload}>
        <HeartRateChart data={points} />
      </DataState>
    </ChartCard>
  );
}