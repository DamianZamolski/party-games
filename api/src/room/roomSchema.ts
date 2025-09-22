import { z } from 'zod';

export const roomSchema = z
  .strictObject({
    id: z.number().readonly(),
    createdAt: z.date().readonly(),
    name: z.string(),
  })
  .readonly();
