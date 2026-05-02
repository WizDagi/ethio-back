import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;

// Strip the query parameters to prevent Pool configuration overrides
let parsedUrl = connectionString;
if (parsedUrl.includes('?')) {
  parsedUrl = parsedUrl.split('?')[0];
}

const pool = new Pool({ 
  connectionString: parsedUrl,
  ssl: {
    rejectUnauthorized: false
  }
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;
