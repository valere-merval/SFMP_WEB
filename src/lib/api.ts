const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

let authToken = localStorage.getItem('sfmp_token') ?? '';

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem('sfmp_token', token);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function login(username: string, password: string): Promise<{ accessToken: string; user: { fullName: string; role: string } }> {
  const payload = await request<{ success: boolean; data: { accessToken: string; user: { fullName: string; role: string } } }>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
  );
  setAuthToken(payload.data.accessToken);
  return payload.data;
}

export async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
    });
    if (!response.ok) return fallback;
    const payload = (await response.json()) as { success?: boolean; data?: T };
    return payload?.data ?? fallback;
  } catch {
    return fallback;
  }
}
