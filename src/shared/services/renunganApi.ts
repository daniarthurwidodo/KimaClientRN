import { Platform } from 'react-native';

const DEV_HOST = Platform.select({ ios: 'localhost', android: '10.0.2.2', default: 'localhost' });
const BASE_URL = `http://${DEV_HOST}:3000`;

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
  const url = `${BASE_URL}/api/renungan?month=${encodeURIComponent(month)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Renungan fetch failed: HTTP ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as RenunganMonth;
}
