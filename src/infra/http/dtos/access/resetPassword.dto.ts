import { TResetPasswordSchema } from '@/application/schemas/access.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDTO implements TResetPasswordSchema {
  @ApiProperty({ description: 'Reset password code', example: '123456' })
  code: string;

  @ApiProperty({ description: 'New user password', example: 'teste@teste123' })
  password: string;
}
