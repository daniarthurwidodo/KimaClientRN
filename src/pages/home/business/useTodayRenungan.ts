import { useMemo } from 'react';
import { useRenunganMonth } from '../../renungan/business/useRenunganMonth';
import { isoDay, monthKey, pickDay } from '../../renungan/business/selectors';
import type { RenunganDay } from '../../../shared/services/renunganApi';

type Result = {
  day: RenunganDay | null;
  today: string;
  loading: boolean;
  error: string | null;
};

export function useTodayRenungan(now: Date = new Date()): Result {
  const today = useMemo(() => isoDay(now), [now]);
  const month = useMemo(() => monthKey(now), [now]);
  const { data, loading, error } = useRenunganMonth(month);
  return { day: pickDay(data, today), today, loading, error };
}
