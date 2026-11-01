import type { ActivitySessionResponse } from "~/services/types";
import { addDays, daysBetween, isSameDay, parseISODate, toISODate } from "~/utils/date";

export interface Session {
  date: Date;
  distanceKm: number;
  durationMin: number;
  heartRate: { min: number; max: number; avg: number };
  calories: number;
}

export function toSession(raw: ActivitySessionResponse): Session {
  return {
    date: parseISODate(raw.date),
    distanceKm: raw.distance,
    durationMin: raw.duration,
    heartRate: { min: raw.heartRate.min, max: raw.heartRate.max, avg: raw.heartRate.average },
    calories: raw.caloriesBurned,
  };
}

const round1 = (n: number) => Math.round(n * 10) / 10;
const sum = (values: number[]) => values.reduce((acc, v) => acc + v, 0);

/* ---------- Graphique km / semaine ---------- */

export interface WeeklyDistancePoint {
  label: string; // "S1"
  km: number;
}

export function getWeeklyDistance(sessions: Session[], periodStart: Date, weeks = 4): WeeklyDistancePoint[] {
  return Array.from({ length: weeks }, (_, i) => {
    const start = addDays(periodStart, i * 7);
    const end = addDays(start, 7);
    const km = sum(sessions.filter((s) => s.date >= start && s.date < end).map((s) => s.distanceKm));
    return { label: `S${i + 1}`, km: round1(km) };
  });
}

export function averageWeeklyKm(points: WeeklyDistancePoint[]): number {
  return points.length ? Math.round(sum(points.map((p) => p.km)) / points.length) : 0;
}

/* ---------- Graphique BPM / jour ---------- */

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export interface DailyHeartRatePoint {
  day: string;
  min: number | null;
  max: number | null;
  avg: number | null;
}

export function getDailyHeartRate(sessions: Session[], weekStart: Date): DailyHeartRatePoint[] {
  return DAY_LABELS.map((day, i) => {
    const daySessions = sessions.filter((s) => isSameDay(s.date, addDays(weekStart, i)));
    if (!daySessions.length) return { day, min: null, max: null, avg: null };
    return {
      day,
      min: Math.min(...daySessions.map((s) => s.heartRate.min)),
      max: Math.max(...daySessions.map((s) => s.heartRate.max)),
      avg: Math.round(sum(daySessions.map((s) => s.heartRate.avg)) / daySessions.length),
    };
  });
}

export function averageHeartRate(sessions: Session[]): number | null {
  return sessions.length ? Math.round(sum(sessions.map((s) => s.heartRate.avg)) / sessions.length) : null;
}

/* ---------- Résumés ---------- */

export interface ActivitySummary {
  sessionsCount: number;
  durationMin: number;
  distanceKm: number;
  calories: number;
}

export function getSummary(sessions: Session[]): ActivitySummary {
  return {
    sessionsCount: sessions.length,
    durationMin: sum(sessions.map((s) => s.durationMin)),
    distanceKm: round1(sum(sessions.map((s) => s.distanceKm))),
    calories: sum(sessions.map((s) => s.calories)),
  };
}

/** Jours sans aucune session entre deux dates (bornes incluses) */
export function countRestDays(sessions: Session[], from: Date, to: Date): number {
  const activeDays = new Set(sessions.map((s) => toISODate(s.date)));
  return Math.max(0, daysBetween(from, to) + 1 - activeDays.size);
}