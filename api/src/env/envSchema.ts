import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  LOKI_URL: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(8888),
});
