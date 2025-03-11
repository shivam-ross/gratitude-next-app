import { z } from 'zod';

export const entryInputSchema = z.object({
    prompt: z.string(),
    content: z.string(),
    color: z.string()
}).passthrough();