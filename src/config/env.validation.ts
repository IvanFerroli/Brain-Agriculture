import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  DATABASE_URL: z.string().url({
    message: 'DATABASE_URL deve ser uma URL válida',
  }),

  PORT: z
    .string()
    .optional()
    .transform((val) => parseInt(val || '3000', 10)),
});

export type EnvVars = z.infer<typeof envSchema>;
