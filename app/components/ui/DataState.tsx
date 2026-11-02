import type { ReactNode } from "react";

interface Props {
  loading: boolean;
  error: string | null;
  hasData: boolean;
  onRetry?: () => void;
  height?: number;
  children: ReactNode;
}

export default function DataState({ loading, error, hasData, onRetry, height = 280, children }: Props) {
  if (error) {
    return (
      <div role="alert" style={{ minHeight: height }} className="flex flex-col items-center justify-center gap-3 text-sm text-accent">
        <p>{error}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="cursor-pointer rounded-lg border border-accent px-4 py-1.5 hover:bg-accent hover:text-white">
            Réessayer
          </button>
        )}
      </div>
    );
  }

  if (loading && !hasData) {
    return (
      <div aria-busy="true" style={{ height }} className="animate-pulse rounded-xl bg-surface">
        <span className="sr-only">Chargement…</span>
      </div>
    );
  }

  return <>{children}</>;
}