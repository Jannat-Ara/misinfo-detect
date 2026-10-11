import { useEffect, useState } from "react";

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}


interface Finished<T> {
  key: string;          
  data: T | null;
  error: string | null;
}


export function useApi<T>(load: () => Promise<T>, deps: unknown[] = []): ApiState<T> {
  
  const key = JSON.stringify(deps);
  const [finished, setFinished] = useState<Finished<T> | null>(null);

  useEffect(() => {
    let cancelled = false; 

    load()
      .then((data) => {
        if (!cancelled) setFinished({ key, data, error: null });
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Something went wrong.";
        if (!cancelled) setFinished({ key, data: null, error: message });
      });

    
    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);


  const loading = finished === null || finished.key !== key;

  return {
    data: loading ? null : finished.data,
    error: loading ? null : finished.error,
    loading,
  };
}