import { formatShortDate } from "~/utils/date";

interface Props {
  start: Date;
  end: Date;
  onPrev: () => void;
  onNext: () => void;
  canGoNext: boolean;
}

const btn =
  "grid h-6 w-6 cursor-pointer place-items-center rounded-full border border-neutral-300 text-sm leading-none transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-inherit";

export default function PeriodNav({ start, end, onPrev, onNext, canGoNext }: Props) {
  return (
    <div className="flex shrink-0 items-center gap-2 text-xs">
      <button type="button" onClick={onPrev} aria-label="Période précédente" className={btn}>‹</button>
      <span className="whitespace-nowrap">{formatShortDate(start)} - {formatShortDate(end)}</span>
      <button type="button" onClick={onNext} disabled={!canGoNext} aria-label="Période suivante" className={btn}>›</button>
    </div>
  );
}