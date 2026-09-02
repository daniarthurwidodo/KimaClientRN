import type { Video } from '../../../shared/services/videoApi';

export function findVideo(videos: Video[], id: string): Video | null {
  return videos.find(v => v.id === id) ?? null;
}
