import { z } from 'zod';
import { validateString } from './schemaValidateFileds';

export const accessSchema = z.object({
  user: validateString,
  password: validateString,
});

export type TAccessSchema = z.infer<typeof accessSchema>;
