import { useCallback, useEffect, useState, type DependencyList } from "react";
import { ApiError } from "~/services/http";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useAsync<T>(fn: (() => Promise<T>) | null, deps: DependencyList): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(fn !== null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!fn) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    fn()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setData(null);
        setError(err instanceof ApiError ? err.message : "Une erreur inattendue est survenue.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // fn est recréée à chaque rendu : ce sont les deps passées qui pilotent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const reload = useCallback(() => setAttempt((a) => a + 1), []);

  return { data, loading, error, reload };
}