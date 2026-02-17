import type z from 'zod';
import type { roomSchema } from './roomSchema';

export type Room = z.infer<typeof roomSchema>;
