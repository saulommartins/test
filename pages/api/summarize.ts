import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { id, body } = req.body ?? {};
  if (typeof id !== 'string' || typeof body !== 'string' || !body.trim()) {
    return res.status(400).json({ error: 'id and body (non-empty strings) are required' });
  }
  const sentences = body
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const summary = sentences.slice(0, 2).join(' ');
  res.status(200).json({ id, summary });
}
