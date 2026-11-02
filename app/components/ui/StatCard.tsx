import type { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
  unit: string;
  loading?: boolean;
}

export default function StatCard({ label, value, unit, loading = false }: Props) {
  return (
    <div className="rounded-lg bg-primary px-5 py-4 text-white">
      <p className="text-xs">{label}</p>
      <p className="mt-3 text-xl font-semibold">
        {loading ? (
          <span aria-busy="true" className="inline-block h-6 w-20 animate-pulse rounded bg-white/30 align-middle">
            <span className="sr-only">Chargement…</span>
          </span>
        ) : (
          <>
            {value} <span className="text-xs font-normal text-primary-light">{unit}</span>
          </>
        )}
      </p>
    </div>
  );
}