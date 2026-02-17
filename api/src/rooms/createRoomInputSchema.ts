import { z } from 'zod';

export const createRoomInputSchema = z.object({
  userId: z.string(),
  roomName: z.string(),
});
