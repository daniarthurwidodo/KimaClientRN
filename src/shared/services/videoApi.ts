import { Platform } from 'react-native';

const DEV_HOST = Platform.select({ ios: 'localhost', android: '10.0.2.2', default: 'localhost' });
const BASE_URL = `http://${DEV_HOST}:3000`;

export type Video = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: string | null;
};

export async function fetchVideos(): Promise<Video[]> {
  const res = await fetch(`${BASE_URL}/api/videos`, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Videos fetch failed: HTTP ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as Video[];
}
