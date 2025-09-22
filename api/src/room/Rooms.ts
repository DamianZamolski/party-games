import type z from 'zod';
import type { roomsSchema } from './roomsSchema.js';

export type Rooms = z.infer<typeof roomsSchema>;
