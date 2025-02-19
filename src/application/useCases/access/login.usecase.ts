import { GetError } from '@/application/errors';
import { AccessRepositories } from '@/application/repositories/access.repository';
import { TAccessSchema } from '@/application/schemas/access.schema';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

interface IResponseLogin {
  token: string;
}

@Injectable()
export class LoginUseCase {
  constructor(private accessRepository: AccessRepositories) {}

  async execute(
    request: TAccessSchema,
    response: Response,
  ): Promise<IResponseLogin> {
    const result = await this.accessRepository.login(request);

    if (result) {
      return { token: 'token' };
    } else {
      throw new GetError({
        title: 'Acesso negado',
        message: 'Usuário ou senha inválidos',
      });
    }
  }
}
