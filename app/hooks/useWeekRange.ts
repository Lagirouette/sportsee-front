import { useState } from "react";
import { addDays, startOfWeek } from "~/utils/date";

/** Période de `weeks` semaines se terminant par la semaine en cours, navigable */
export function useWeekRange(weeks: number) {
  const [offset, setOffset] = useState(0); // 0 = période actuelle, -1 = précédente…

  const currentWeekStart = startOfWeek(new Date());
  const start = addDays(currentWeekStart, -(weeks - 1) * 7 + offset * weeks * 7);
  const end = addDays(start, weeks * 7 - 1);

  return {
    start,
    end,
    onPrev: () => setOffset((o) => o - 1),
    onNext: () => setOffset((o) => Math.min(o + 1, 0)),
    canGoNext: offset < 0,
  };
}