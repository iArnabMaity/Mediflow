/**
 * Database Connection Management
 * Using PostgreSQL with pg library
 */

import { Pool, PoolClient } from 'pg';
import { config } from '../config';

let pool: Pool | null = null;

/**
 * Initialize database connection pool
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    pool = new Pool({
      connectionString: config.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connection established');
    client.release();
  } catch (error: any) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
};

/**
 * Get database pool instance
 */
export const getPool = (): Pool => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  return pool;
};

/**
 * Execute query
 */
export const query = async (
  text: string,
  params?: any[]
): Promise<any> => {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
};

/**
 * Execute query with client (for transactions)
 */
export const queryWithClient = async (
  client: PoolClient,
  text: string,
  params?: any[]
): Promise<any> => {
  const result = await client.query(text, params);
  return result.rows;
};

/**
 * Begin transaction
 */
export const beginTransaction = async (): Promise<PoolClient> => {
  const client = await getPool().connect();
  await client.query('BEGIN');
  return client;
};

/**
 * Commit transaction
 */
export const commitTransaction = async (client: PoolClient): Promise<void> => {
  try {
    await client.query('COMMIT');
  } finally {
    client.release();
  }
};

/**
 * Rollback transaction
 */
export const rollbackTransaction = async (client: PoolClient): Promise<void> => {
  try {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

/**
 * Close database connection pool
 */
export const closeDatabase = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('✅ Database connection closed');
  }
};

export default {
  initializeDatabase,
  getPool,
  query,
  queryWithClient,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
  closeDatabase,
};
