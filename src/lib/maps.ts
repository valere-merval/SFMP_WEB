export function googleMapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleMapsDirectionsUrl(destination: string, origin?: string) {
  const params = new URLSearchParams({ api: '1', destination });
  if (origin) params.set('origin', origin);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function googleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
}
