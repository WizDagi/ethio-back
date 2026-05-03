import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

let prisma: PrismaClient;

/**
 * Lazy-load Prisma to prevent startup crashes on Vercel.
 * This ensures the health check can still run even if the DB connection has issues.
 */
export const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    } as any);
  }
  return prisma;
};

// Also export a default instance for existing imports
export default getPrisma();
