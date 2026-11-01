import { toUserProfile } from "~/models/user";
import { dataService } from "~/services";
import { useAsync } from "./useAsync";

export function useUserInfo() {
  return useAsync(() => dataService.getUserInfo().then(toUserProfile), []);
}