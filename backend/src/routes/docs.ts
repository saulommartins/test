import { Router } from 'express';
import { DOCS } from '../data/docs';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json(DOCS);
});

export default router;
