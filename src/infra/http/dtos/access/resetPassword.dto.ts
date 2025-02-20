import { TResetPasswordSchema } from '@/application/schemas/access.schema';

export class ResetPasswordDTO implements TResetPasswordSchema {
  code: string;
  password: string;
}
