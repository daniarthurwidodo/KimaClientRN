import { useEffect, useState } from 'react';
import { fetchVideos, type Video } from '../../../shared/services/videoApi';

type State = {
  data: Video[];
  loading: boolean;
  error: string | null;
};

export function useVideos(): State {
  const [state, setState] = useState<State>({ data: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    fetchVideos()
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: [], loading: false, error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
