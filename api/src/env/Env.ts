import type z from 'zod';
import type { envSchema } from './envSchema.js';

export type Env = z.infer<typeof envSchema>;
