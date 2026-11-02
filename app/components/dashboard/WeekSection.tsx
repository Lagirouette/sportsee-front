import WeeklyGoalChart from "~/components/charts/WeeklyGoalChart";
import DataState from "~/components/ui/DataState";
import { WEEKLY_GOAL } from "~/config";
import { useUserActivity } from "~/hooks/useUserActivity";
import { getSummary } from "~/models/activity";
import { addDays, formatNumericDate, startOfWeek } from "~/utils/date";

export default function WeekSection() {
  const start = startOfWeek(new Date());
  const end = addDays(start, 6);
  const { data, loading, error, reload } = useUserActivity(start, end);
  const summary = data ? getSummary(data) : null;

  return (
    <section className="mt-14">
      <h2 className="text-xl font-medium">Cette semaine</h2>
      <p className="mb-5 mt-1 text-sm text-muted">
        Du {formatNumericDate(start)} au {formatNumericDate(end)}
      </p>

      <DataState loading={loading} error={error} hasData={!!data} onRetry={reload}>
        {summary && (
          <div className="grid grid-cols-2 items-start gap-6">
            <article className="rounded-2xl bg-white p-6 shadow-card">
              <p className="text-2xl font-semibold text-primary">
                x{summary.sessionsCount}{" "}
                <span className="text-sm font-normal text-primary-light">sur objectif de {WEEKLY_GOAL}</span>
              </p>
              <p className="mt-1 text-xs text-muted">Courses hebdomadaires réalisées</p>
              <WeeklyGoalChart done={summary.sessionsCount} goal={WEEKLY_GOAL} />
            </article>

            <div className="flex flex-col gap-4">
              <article className="rounded-2xl bg-white p-6 shadow-card">
                <p className="text-xs text-muted">Durée d'activité</p>
                <p className="mt-2 text-xl font-semibold text-primary">
                  {summary.durationMin} <span className="text-sm font-normal text-primary-light">minutes</span>
                </p>
              </article>
              <article className="rounded-2xl bg-white p-6 shadow-card">
                <p className="text-xs text-muted">Distance</p>
                <p className="mt-2 text-xl font-semibold text-accent">
                  {summary.distanceKm} <span className="text-sm font-normal text-accent-light">kilomètres</span>
                </p>
              </article>
            </div>
          </div>
        )}
      </DataState>
    </section>
  );
}