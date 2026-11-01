import { request } from "./http";
import type { DataService, LoginResponse } from "./types";

export const apiService: DataService = {
  login: (username, password) =>
    request<LoginResponse>(
      "/api/login",
      { method: "POST", body: JSON.stringify({ username, password }) },
      { auth: false }
    ),
};