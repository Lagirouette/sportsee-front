import type { ActivitySessionResponse, UserInfoResponse } from "~/services/types";

interface MockUser {
  password: string;
  info: UserInfoResponse;
  activity: ActivitySessionResponse[];
}

export const MOCK_USERS: Record<string, MockUser> = {
  sophiemartin: {
    password: "password123",
    info: {
      profile: {
        firstName: "Sophie",
        lastName: "Martin",
        createdAt: "2025-01-01",
        age: 35,
        weight: 60,
        height: 165,
        profilePicture: "/mock/sophie.jpg",
      },
      statistics: { totalDistance: "2250.2", totalSessions: 348, totalDuration: 14625 },
    },
    activity: [
      { date: "2025-01-04", distance: 5.8, duration: 38, heartRate: { min: 140, max: 178, average: 163 }, caloriesBurned: 422 },
      { date: "2025-01-05", distance: 3.2, duration: 20, heartRate: { min: 148, max: 184, average: 171 }, caloriesBurned: 248 },
      // ... reste des sessions depuis data.json
    ],
  },
  // emmaleroy: { password: "password789", ... },
  // marcdubois: { password: "password456", ... },
};