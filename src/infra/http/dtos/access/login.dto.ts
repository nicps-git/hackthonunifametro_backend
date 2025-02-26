import { TAccessSchema } from '@/application/schemas/access.schema';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO implements TAccessSchema {
  @ApiProperty({ description: 'User login', example: '12345678909' })
  user: string;

  @ApiProperty({ description: 'User password', example: 'tes@1234' })
  password: string;
}

export class LoginSuccessResponseDTO {
  @ApiProperty({
    example: {
      token: '123sdfgshf73r52gr74gr8934gr24rg674gr47gr08142gr8012gry42vby',
    },
  })
  data: {
    token: string;
  };
}
