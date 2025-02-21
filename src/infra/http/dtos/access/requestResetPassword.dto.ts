import { TRequestResetPasswordSchema } from '@/application/schemas/access.schema';

export class RequestResetPasswordDTO implements TRequestResetPasswordSchema {
  email: string;
}
