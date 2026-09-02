import { useEffect, useState } from 'react';
import { fetchRenunganMonth, type RenunganMonth } from '../../../shared/services/renunganApi';

type State = {
  data: RenunganMonth | null;
  loading: boolean;
  error: string | null;
};

export function useRenunganMonth(month: string): State {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fetchRenunganMonth(month)
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [month]);

  return state;
}
