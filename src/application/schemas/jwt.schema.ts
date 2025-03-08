import { z } from 'zod';
import { validateString, validateUuidToken } from './schemaValidateFileds';

export const tokenSchema = z.object({
  idUser: validateUuidToken,
  user: validateUuidToken,
  perfil: validateString,
});

export type TTokenSchema = z.infer<typeof tokenSchema>;
