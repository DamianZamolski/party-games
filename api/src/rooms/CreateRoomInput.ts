import type z from 'zod';
import type { createRoomInputSchema } from './createRoomInputSchema.js';

export type CreateRoomInput = z.infer<typeof createRoomInputSchema>;
