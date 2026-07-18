/**
 * Health Check Routes
 */

import { Router, Request, Response } from 'express';

const router = Router();

interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  services: {
    database: 'ok' | 'error';
    redis: 'ok' | 'error';
  };
  version: string;
}

/**
 * GET /health
 * Basic health check
 */
router.get('/', (req: Request, res: Response) => {
  const healthStatus: HealthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: 'ok',
      redis: 'ok',
    },
    version: '1.0.0',
  };

  res.status(200).json(healthStatus);
});

/**
 * GET /health/detailed
 * Detailed health check with service status
 */
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    const healthStatus: HealthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: 'ok',
        redis: 'ok',
      },
      version: '1.0.0',
    };

    // TODO: Add actual database and Redis health checks
    // const dbHealth = await checkDatabaseHealth();
    // const redisHealth = await checkRedisHealth();

    res.status(200).json(healthStatus);
  } catch (error: any) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: 'error',
        redis: 'error',
      },
      error: error.message,
      version: '1.0.0',
    });
  }
});

/**
 * GET /health/ready
 * Readiness check (indicates if service is ready to accept requests)
 */
router.get('/ready', (req: Request, res: Response) => {
  res.status(200).json({
    ready: true,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /health/live
 * Liveness check (indicates if service is running)
 */
router.get('/live', (req: Request, res: Response) => {
  res.status(200).json({
    live: true,
    timestamp: new Date().toISOString(),
  });
});

export default router;
