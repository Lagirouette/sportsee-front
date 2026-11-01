import { MOCK_USERS } from "~/mocks/data";
import { toISODate } from "~/utils/date";
import { ApiError } from "./http";
import { tokenStorage } from "./tokenStorage";
import type { DataService } from "./types";

const TOKEN_PREFIX = "mock-token-";
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

function currentUser() {
  const token = tokenStorage.get();
  const username = token?.startsWith(TOKEN_PREFIX) ? token.slice(TOKEN_PREFIX.length) : undefined;
  const user = username ? MOCK_USERS[username] : undefined;
  if (!user) throw new ApiError(401, "Identifiants incorrects ou session expirée.");
  return user;
}

export const mockService: DataService = {
  async login(username, password) {
    await delay();
    if (MOCK_USERS[username]?.password !== password) {
      throw new ApiError(401, "Identifiants incorrects ou session expirée.");
    }
    return { token: `${TOKEN_PREFIX}${username}`, userId: username };
  },

  async getUserInfo() {
    await delay();
    return currentUser().info;
  },

  // Même comportement que l'API : bornes incluses, tri croissant, pas de dates futures
  async getUserActivity(startWeek, endWeek) {
    await delay();
    const today = toISODate(new Date());
    return currentUser()
      .activity.filter((s) => s.date >= startWeek && s.date <= endWeek && s.date <= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  },
};