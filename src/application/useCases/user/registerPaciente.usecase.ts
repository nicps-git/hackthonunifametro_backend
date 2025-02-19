import { UserRepositories } from '@/application/repositories/user.repository';
import { TRegisterPacienteSchema } from '@/application/schemas/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterPacienteUseCase {
  constructor(private userRepositories: UserRepositories) {}

  async execute(request: TRegisterPacienteSchema): Promise<boolean> {
    const result = await this.userRepositories.registerPaciente({
      ...request,
      user: request.cpf,
    });

    return result;
  }
}
