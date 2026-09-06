import { resolveBaseUrl } from './apiBase';

export type Video = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: string | null;
};

export async function fetchVideos(): Promise<Video[]> {
  const baseUrl = await resolveBaseUrl();
  const res = await fetch(`${baseUrl}/api/videos`, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Videos fetch failed: HTTP ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as Video[];
}
