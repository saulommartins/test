import { Router } from 'express';
import { summarize } from '../services/summarizer';

const router = Router();

router.post('/', (req, res) => {
  const { id, body } = req.body ?? {};

  if (typeof id !== 'string' || !id.trim()) {
    return res.status(400).json({ error: 'id (non-empty string) is required' });
  }
  if (typeof body !== 'string' || !body.trim()) {
    return res.status(400).json({ error: 'body (non-empty string) is required' });
  }

  const summary = summarize(body);
  return res.status(200).json({ id, summary });
});

export default router;
