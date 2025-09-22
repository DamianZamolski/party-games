import type z from 'zod';
import type { roomSchema } from './roomSchema.js';

export type Room = z.infer<typeof roomSchema>;
