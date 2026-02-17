import z from 'zod';

export const roomSchema = z.object({
  users: z.array(z.object({ id: z.string(), isAdmin: z.boolean() })),
});
