import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

// In Prisma 7, the property is 'datasourceUrl' (singular)
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  } as any);
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
