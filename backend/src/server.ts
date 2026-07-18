import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { config } from './config';
import { initializeDatabase, closeDatabase } from './services/database';

// Import routes
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import healthRoutes from './routes/health';

dotenv.config();

const app: Express = express();
const port = config.PORT;

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check endpoints
app.use('/health', healthRoutes);

// API v1 routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);

// Root API endpoint
app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'MediFlow API v1.0.0',
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    status: statusCode,
    timestamp: new Date().toISOString(),
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ============================================
// SERVER STARTUP
// ============================================

const startServer = async () => {
  try {
    // Initialize database
    console.log('🔄 Initializing database connection...');
    await initializeDatabase();

    // Start listening
    app.listen(port, () => {
      console.log(`✅ MediFlow Backend Server running on http://localhost:${port}`);
      console.log(`📊 Health check available at http://localhost:${port}/health`);
      console.log(`🔑 Auth endpoints at http://localhost:${port}/api/v1/auth`);
      console.log(`👥 Users endpoints at http://localhost:${port}/api/v1/users`);
      console.log(`🌍 Environment: ${config.NODE_ENV}`);
    });
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📍 SIGTERM received, shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('📍 SIGINT received, shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

// Start the server
startServer();

export default app;
