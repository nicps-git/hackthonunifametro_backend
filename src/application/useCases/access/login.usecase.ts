import { GetError } from '@/application/errors';
import { EncrypterGateway } from '@/application/gateways/encrypter.gatway';
import { HasherGateway } from '@/application/gateways/hasher.gatway';
import { AccessRepositories } from '@/application/repositories/access.repository';
import { TAccessSchema } from '@/application/schemas/access.schema';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

interface IResponseLogin {
  token: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private accessRepository: AccessRepositories,
    private encrypterGateway: EncrypterGateway,
    private hasherGateway: HasherGateway,
  ) {}

  async execute(
    request: TAccessSchema,
    response: Response,
  ): Promise<IResponseLogin> {
    const result = await this.accessRepository.login(request);

    if (
      result &&
      (await this.hasherGateway.compare(request.password, result.password))
    ) {
      const token = await this.encrypterGateway.encrypt({
        idPaciente: result.idPaciente,
        user: result.user,
        perfil: result.perfil,
      });

      response.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain: 'localhost',
      });

      return { token };
    } else {
      throw new GetError({
        title: 'Acesso negado',
        message: 'Usuário ou senha inválidos',
      });
    }
  }
}
