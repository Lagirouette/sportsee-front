import DistanceSection from "~/components/dashboard/DistanceSection";
import HeartRateSection from "~/components/dashboard/HeartRateSection";
import WeekSection from "~/components/dashboard/WeekSection";
import DataState from "~/components/ui/DataState";
import UserIdentity from "~/components/ui/UserIdentity";
import { useUserInfo } from "~/hooks/useUserInfo";

export function meta() {
  return [{ title: "Dashboard – SportSee" }];
}

export default function Dashboard() {
  const user = useUserInfo();

  return (
    <div>
      <DataState loading={user.loading} error={user.error} hasData={!!user.data} onRetry={user.reload} height={128}>
        {user.data && (
          <section className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-card">
            <UserIdentity user={user.data} />
            <div className="flex items-center gap-6">
              <span className="text-sm text-muted">Distance totale parcourue</span>
              <strong className="rounded-lg bg-primary px-8 py-5 text-2xl font-semibold text-white">
                {Math.round(user.data.totalDistanceKm)} km
              </strong>
            </div>
          </section>
        )}
      </DataState>

      <section className="mt-14">
        <h2 className="mb-5 text-xl font-medium">Vos dernières performances</h2>
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
          <DistanceSection />
          <HeartRateSection />
        </div>
      </section>

      <WeekSection />
    </div>
  );
}