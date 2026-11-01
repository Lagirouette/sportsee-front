import type { UserInfoResponse } from "~/services/types";
import { parseISODate } from "~/utils/date";

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  memberSince: Date;
  age: number;
  weightKg: number;
  heightCm: number;
  pictureUrl: string;
  totalDistanceKm: number;
  totalSessions: number;
  totalDurationMin: number;
}

export function toUserProfile({ profile, statistics }: UserInfoResponse): UserProfile {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    fullName: `${profile.firstName} ${profile.lastName}`,
    memberSince: parseISODate(profile.createdAt),
    age: profile.age,
    weightKg: profile.weight,
    heightCm: profile.height,
    pictureUrl: profile.profilePicture,
    totalDistanceKm: Number.parseFloat(statistics.totalDistance) || 0,
    totalSessions: statistics.totalSessions,
    totalDurationMin: statistics.totalDuration,
  };
}

/** 165 → "1m65" */
export function formatHeight(cm: number): string {
  return `${Math.floor(cm / 100)}m${String(cm % 100).padStart(2, "0")}`;
}

/** 1635 → { hours: 27, minutes: 15 } (affiché "27h 15min") */
export function splitDuration(totalMin: number) {
  return { hours: Math.floor(totalMin / 60), minutes: totalMin % 60 };
}