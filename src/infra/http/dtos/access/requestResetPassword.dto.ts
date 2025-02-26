import { TRequestResetPasswordSchema } from '@/application/schemas/access.schema';
import { ApiProperty } from '@nestjs/swagger';

export class RequestResetPasswordDTO implements TRequestResetPasswordSchema {
  @ApiProperty({ description: 'User email', example: 'test@test.com' })
  email: string;
}
