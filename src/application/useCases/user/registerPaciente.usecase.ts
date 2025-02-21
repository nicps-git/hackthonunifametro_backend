import { EmailGateway } from '@/application/gateways/email.gatway';
import { HasherGateway } from '@/application/gateways/hasher.gatway';
import { UserRepositories } from '@/application/repositories/user.repository';
import { TRegisterPacienteSchema } from '@/application/schemas/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterPacienteUseCase {
  constructor(
    private userRepositories: UserRepositories,
    private hasherGateway: HasherGateway,
    private emailGateway: EmailGateway,
  ) {}

  async execute(request: TRegisterPacienteSchema): Promise<boolean> {
    const passwordHash = await this.hasherGateway.hash(request.password);

    const result = await this.userRepositories.registerPaciente({
      ...request,
      user: request.cpf,
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
