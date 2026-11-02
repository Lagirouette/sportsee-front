import DataState from "~/components/ui/DataState";
import StatCard from "~/components/ui/StatCard";
import UserIdentity from "~/components/ui/UserIdentity";
import { useUserActivity } from "~/hooks/useUserActivity";
import { useUserInfo } from "~/hooks/useUserInfo";
import { countRestDays, getSummary } from "~/models/activity";
import { formatHeight, splitDuration } from "~/models/user";
import { formatLongDate } from "~/utils/date";

export function meta() {
  return [{ title: "Mon profil – SportSee" }];
}

export default function Profile() {
  const user = useUserInfo();
  const today = new Date();
  // Historique complet : nécessaire pour les calories et les jours de repos
  const activity = useUserActivity(user.data?.memberSince ?? null, user.data ? today : null);

  if (!user.data) {
    return (
      <DataState loading={user.loading} error={user.error} hasData={false} onRetry={user.reload} height={320}>
        {null}
      </DataState>
    );
  }

  const u = user.data;
  const { hours, minutes } = splitDuration(u.totalDurationMin);
  const activityLoading = activity.loading && !activity.data;
  const calories = activity.data ? getSummary(activity.data).calories.toLocaleString("fr-FR") : "—";
  const restDays = activity.data ? countRestDays(activity.data, u.memberSince, today) : "—";

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-8">
      {/* Colonne gauche */}
      <div className="flex flex-col gap-3">
        <section className="rounded-2xl bg-white p-6 shadow-card">
          <UserIdentity user={u} />
        </section>

        <section className="rounded-2xl bg-white px-6 pb-10 pt-8 shadow-card">
          <h2 className="border-b border-neutral-200 pb-5 text-xl font-medium">Votre profil</h2>
          <ul className="mt-6 space-y-5 text-sm text-muted">
            <li>Âge : {u.age}</li>
            <li>Taille : {formatHeight(u.heightCm)}</li>
            <li>Poids : {u.weightKg}kg</li>
          </ul>
        </section>
      </div>

      {/* Colonne droite */}
      <section>
        <h2 className="text-xl font-medium">Vos statistiques</h2>
        <p className="mb-6 mt-1 text-xs text-muted">depuis le {formatLongDate(u.memberSince)}</p>

        {activity.error && (
          <div role="alert" className="mb-4 flex items-center justify-between rounded-lg bg-accent-light/40 px-4 py-2 text-sm text-accent">
            <span>{activity.error}</span>
            <button type="button" onClick={activity.reload} className="cursor-pointer underline">
              Réessayer
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Temps total couru" value={`${hours}h`} unit={`${minutes}min`} />
          <StatCard label="Calories brûlées" value={calories} unit="cal" loading={activityLoading} />
          <StatCard label="Distance totale parcourue" value={Math.round(u.totalDistanceKm)} unit="km" />
          <StatCard label="Nombre de jours de repos" value={restDays} unit="jours" loading={activityLoading} />
          <StatCard label="Nombre de sessions" value={u.totalSessions} unit="sessions" />
        </div>
      </section>
    </div>
  );
}