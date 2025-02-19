import { TAccessSchema } from '@/application/schemas/access.schema';

export class LoginDTO implements TAccessSchema {
  user: string;

  password: string;
}

export class LoginSuccessResponseDTO {
  data: {
    token: string;
  };
}
