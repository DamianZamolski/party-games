import z from 'zod';
import { roomSchema } from './roomSchema.js';

export const roomsSchema = z.array(roomSchema).readonly();
