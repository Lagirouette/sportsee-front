import { toSession } from "~/models/activity";
import { dataService } from "~/services";
import { toISODate } from "~/utils/date";
import { useAsync } from "./useAsync";

/** Passe null pour ne pas lancer la requête (ex : en attendant le profil) */
export function useUserActivity(start: Date | null, end: Date | null) {
  const startIso = start ? toISODate(start) : null;
  const endIso = end ? toISODate(end) : null;

  return useAsync(
    startIso && endIso
      ? () => dataService.getUserActivity(startIso, endIso).then((list) => list.map(toSession))
      : null,
    [startIso, endIso]
  );
}