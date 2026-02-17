import z from 'zod';

export const startMatchInputSchema = z.object({
  roomName: z.string(),
  userId: z.string(),
});
