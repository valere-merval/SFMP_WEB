const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`)
    if (!response.ok) return fallback
    const payload = (await response.json()) as { success?: boolean; data?: T }
    return payload?.data ?? fallback
  } catch {
    return fallback
  }
}
