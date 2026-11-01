import { useUserActivity } from "~/hooks/useUserActivity";
import { useUserInfo } from "~/hooks/useUserInfo";

export default function Dashboard() {
  const user = useUserInfo();
  const activity = useUserActivity(user.data?.memberSince ?? null, user.data ? new Date() : null);

  if (user.loading) return <p>Chargement…</p>;
  if (user.error) return <p role="alert">{user.error} <button onClick={user.reload}>Réessayer</button></p>;

  return (
    <pre>
      {JSON.stringify(
        {
          user: user.data,
          sessions: activity.data?.length,
          first: activity.data?.[0]?.date,
          last: activity.data?.at(-1)?.date,
        },
        null,
        2
      )}
    </pre>
  );
}