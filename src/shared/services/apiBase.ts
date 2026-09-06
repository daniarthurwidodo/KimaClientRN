import { Platform } from 'react-native';

/**
 * Dev backend discovery.
 *
 * The backend normally listens on 3000, but falls back to 3311 when 3000 is
 * taken. We probe the candidates once per app session and reuse the winner.
 *
 * Host notes:
 *  - Android emulator reaches the host machine through 10.0.2.2.
 *  - A physical device over USB needs `adb reverse tcp:<port> tcp:<port>`,
 *    which `scripts/run-android.js` sets up; localhost then works.
 */
const PORTS = [3000, 3311];

const HOSTS = Platform.select({
  ios: ['localhost'],
  // Try localhost first: with adb reverse in place it wins on real devices,
  // and 10.0.2.2 covers the emulator.
  android: ['localhost', '10.0.2.2'],
  default: ['localhost'],
}) as string[];

const PROBE_TIMEOUT_MS = 1500;

function candidates(): string[] {
  const urls: string[] = [];
  for (const port of PORTS) {
    for (const host of HOSTS) {
      urls.push(`http://${host}:${port}`);
    }
  }
  return urls;
}

/** Any HTTP answer means something is listening — 404 counts as alive. */
async function isAlive(baseUrl: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try {
    await fetch(`${baseUrl}/api/videos`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

let pending: Promise<string> | null = null;

async function probe(): Promise<string> {
  const urls = candidates();
  for (const url of urls) {
    if (await isAlive(url)) {
      return url;
    }
  }
  // Nothing answered. Return the first candidate so callers still produce a
  // normal network error instead of a confusing resolution error.
  return urls[0];
}

/** Resolved once, then cached for the life of the app session. */
export function resolveBaseUrl(): Promise<string> {
  if (!pending) {
    pending = probe();
  }
  return pending;
}

/** Forces the next call to probe again — useful after starting the backend. */
export function resetBaseUrl(): void {
  pending = null;
}
