import { EmailGateway } from '@/application/gateways/email.gatway';
import { HasherGateway } from '@/application/gateways/hasher.gatway';
import { UserRepositories } from '@/application/repositories/user.repository';
import { TRegisterMedicoSchema } from '@/application/schemas/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterMedicoUseCase {
  constructor(
    private userRepositories: UserRepositories,
    private hasherGateway: HasherGateway,
    private emailGateway: EmailGateway,
  ) {}

  async execute(request: TRegisterMedicoSchema): Promise<boolean> {
    const passwordHash = await this.hasherGateway.hash(request.password);

    const result = await this.userRepositories.registerMedico({
      ...request,
      user: request.crm,
      password: passwordHash,
    });

    if (result) {
      await this.emailGateway.sendFreeMail({
        to: request.email,
        title: 'Cadastro realizado com sucesso!',
        html: `<h1>Seu cadastro foi realizado com sucesso!</h1>`,
      });
    }

    return result;
  }
}
