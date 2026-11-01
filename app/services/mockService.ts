import { ApiError } from "./http";
import type { DataService } from "./types";

const USERS: Record<string, string> = {
  sophiemartin: "password123",
  emmaleroy: "password789",
  marcdubois: "password456",
};

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const mockService: DataService = {
  async login(username, password) {
    await delay();
    if (USERS[username] !== password) {
      throw new ApiError(401, "Identifiants incorrects ou session expirée.");
    }
    return { token: `mock-token-${username}`, userId: username };
  },
};