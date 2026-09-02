import type { RenunganDay, RenunganMonth } from '../../../shared/services/renunganApi';

export function pickDay(month: RenunganMonth | null, date: string): RenunganDay | null {
  if (!month) return null;
  return month.days.find(d => d.date === date) ?? null;
}

export function monthKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function isoDay(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
