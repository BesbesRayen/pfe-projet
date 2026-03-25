import { API_BASE_URL, API_TIMEOUT_MS } from './config';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function request<T>(
  path: string,
  options: RequestInit & { params?: Record<string, string | number> } = {}
): Promise<T> {
  const { params, ...init } = options;
  const url = new URL(path, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  console.log('[API] Request:', init.method || 'GET', url.toString());
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers as Record<string, string>),
      },
    });
    clearTimeout(timeoutId);
    const text = await res.text();
    console.log('[API] Response status:', res.status, 'body:', text.substring(0, 200));
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    if (!res.ok) {
      const msg =
        data && typeof data === 'object' && 'message' in data && typeof (data as { message: string }).message === 'string'
          ? (data as { message: string }).message
          : res.statusText || `HTTP ${res.status}`;
      throw new ApiError(msg, res.status, data);
    }
    return data as T;
  } catch (e) {
    clearTimeout(timeoutId);
    console.error('[API] Error:', e instanceof Error ? e.message : String(e));
    if (e instanceof ApiError) throw e;
    if (e instanceof Error) throw new ApiError(e.message, 0);
    throw new ApiError('Network error', 0);
  }
}
