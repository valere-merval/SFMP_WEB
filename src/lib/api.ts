const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

let authToken = localStorage.getItem('sfmp_token') ?? '';

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem('sfmp_token', token);
}

export async function clearAuthToken() {
  authToken = '';
  localStorage.removeItem('sfmp_token');
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = typeof FormData !== 'undefined' && init?.body instanceof FormData;
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const payload = await request<{ success?: boolean; data?: T }>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (payload.data === undefined || payload.data === null) {
    throw new Error(`Empty response from ${path}`);
  }

  return payload.data;
}

export async function uploadImage(file: File): Promise<{ key: string; url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const payload = await request<{ success?: boolean; data?: { key: string; url: string } }>('/api/v1/uploads/images', {
    method: 'POST',
    body: formData,
  });

  if (payload.data === undefined || payload.data === null) {
    throw new Error('Empty upload response');
  }

  return payload.data;
}

export async function login(username: string, password: string): Promise<{ accessToken: string; user: { fullName: string; role: string } }> {
  const payload = await request<{ success: boolean; data: { accessToken: string; user: { fullName: string; role: string } } }>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
  );

  if (!payload.data) {
    throw new Error('Login response missing data');
  }

  setAuthToken(payload.data.accessToken);
  return payload.data;
}

export async function getJson<T>(path: string): Promise<T> {
  const payload = await request<{ success?: boolean; data?: T }>(path);

  if (payload.data === undefined || payload.data === null) {
    throw new Error(`Empty response from ${path}`);
  }

  return payload.data;
}
