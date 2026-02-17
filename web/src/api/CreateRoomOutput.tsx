import type z from 'zod';
import type { createRoomOutputSchema } from './createRoomOutputSchema';

export type CreateRoomOutput = z.infer<typeof createRoomOutputSchema>;
