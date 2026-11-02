import type { UserProfile } from "~/models/user";
import { formatLongDate } from "~/utils/date";

export default function UserIdentity({ user }: { user: UserProfile }) {
  return (
    <div className="flex items-center gap-6">
      <img src={user.pictureUrl} alt={`Photo de ${user.fullName}`} className="h-20 w-20 rounded-xl object-cover" />
      <div>
        <p className="text-xl font-medium">{user.fullName}</p>
        <p className="mt-1 text-xs text-muted">Membre depuis le {formatLongDate(user.memberSince)}</p>
      </div>
    </div>
  );
}