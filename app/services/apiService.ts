import { request } from "./http";
import type { ActivitySessionResponse, DataService, LoginResponse, UserInfoResponse } from "./types";

export const apiService: DataService = {
  login: (username, password) =>
    request<LoginResponse>(
      "/api/login",
      { method: "POST", body: JSON.stringify({ username, password }) },
      { auth: false }
    ),

  getUserInfo: () => request<UserInfoResponse>("/api/user-info"),

  getUserActivity: (startWeek, endWeek) => {
    const params = new URLSearchParams({ startWeek, endWeek });
    return request<ActivitySessionResponse[]>(`/api/user-activity?${params}`);
  },
};