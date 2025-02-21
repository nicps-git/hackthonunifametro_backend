import { z } from 'zod';
import {
  validateUserPermissions,
  validateUuidToken,
} from './schemaValidateFileds';

export const tokenSchema = z.object({
  idUser: validateUuidToken,
  permissions: validateUserPermissions,
});

export type TTokenSchema = z.infer<typeof tokenSchema>;
