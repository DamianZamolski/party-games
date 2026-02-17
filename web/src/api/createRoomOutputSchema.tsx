import z from 'zod';

export const createRoomOutputSchema = z.object({ url: z.string() });
