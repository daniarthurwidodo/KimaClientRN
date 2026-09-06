import { resolveBaseUrl } from './apiBase';

export type RenunganScripture = {
  ref: string;
  text: string;
  error: string | null;
};

export type RenunganDay = {
  date: string;
  hasContent: boolean;
  imageUrl: string;
  id: string | null;
  title: string | null;
  content: string | null;
  scripture: RenunganScripture | null;
};

export type RenunganMonth = {
  month: string;
  days: RenunganDay[];
};

export async function fetchRenunganMonth(month: string): Promise<RenunganMonth> {
  const baseUrl = await resolveBaseUrl();
  const url = `${baseUrl}/api/renungan?month=${encodeURIComponent(month)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Renungan fetch failed: HTTP ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as RenunganMonth;
}
