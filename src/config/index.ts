/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  status: process.env.STATUS,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  saltRounds: process.env.SALT_ROUNDS,
};
