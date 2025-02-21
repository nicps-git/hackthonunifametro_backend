import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  HERMES_HOST: z.string().url(),
  HERMES_PRIVATE_KEY: z.string().min(1),
  JWT_PRIVATE_KEY: z.string().min(1),
  JWT_PUBLIC_KEY: z.string().min(1),
  PORT: z.coerce.number().optional().default(8081),
});

export type Env = z.infer<typeof envSchema>;
