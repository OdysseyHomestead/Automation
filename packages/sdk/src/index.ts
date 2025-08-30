import type { HealthStatus } from '@automation/core-domain';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://api.localhost';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export async function getHealth(): Promise<HealthStatus> {
  const res = await fetch(`${API_BASE}/health`, { cache: 'no-store' });
  return json<HealthStatus>(res);
}

export async function getVersion(): Promise<{ version: string }>
{
  const res = await fetch(`${API_BASE}/v1/version`, { cache: 'no-store' });
  return json<{ version: string }>(res);
}

