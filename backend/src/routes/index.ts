// Placeholder routes directory
import { Router } from 'express';

const router = Router();

// Example routes
router.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
