import { Doc, SummarizeResponse } from '../types/doc';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function fetchDocs(signal?: AbortSignal): Promise<Doc[]> {
  const res = await fetch(`${API_BASE}/api/docs`, { signal });
  if (!res.ok) throw new Error(`Failed to load docs (${res.status})`);
  return res.json();
}

export async function summarizeDoc(
  id: string,
  body: string,
  signal?: AbortSignal,
): Promise<SummarizeResponse> {
  const res = await fetch(`${API_BASE}/api/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, body }),
    signal,
  });
  if (!res.ok) throw new Error(`Server error (${res.status})`);
  return res.json();
}
