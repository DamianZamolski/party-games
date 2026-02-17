import type z from 'zod';
import type { startMatchInputSchema } from './startMatchInputSchema.js';

export type StartMatchInput = z.infer<typeof startMatchInputSchema>;
