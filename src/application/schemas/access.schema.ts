import { z } from 'zod';
import { validateEmail, validateString } from './schemaValidateFileds';

export const accessSchema = z.object({
  user: validateString,
  password: validateString,
});

export type TAccessSchema = z.infer<typeof accessSchema>;

export const requestResetPasswordSchema = z.object({
  email: validateEmail,
});

export type TRequestResetPasswordSchema = z.infer<
  typeof requestResetPasswordSchema
>;

export const resetPasswordSchema = z.object({
  password: validateString,
  code: validateString
    .min(6, 'Código deve conter no mínimo 6 caracteres')
    .max(6, 'Código deve conter no máximo 6 caracteres'),
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
