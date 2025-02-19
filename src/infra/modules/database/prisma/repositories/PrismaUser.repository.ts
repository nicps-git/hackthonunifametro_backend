import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  IPacienteRepository,
  UserRepositories,
} from '@/application/repositories/user.repository';

@Injectable()
export class PrismaUserRepositories implements UserRepositories {
  constructor(private prismaService: PrismaService) {}

  async registerPaciente(paciente: IPacienteRepository): Promise<boolean> {
    try {
      const userExists = await this.prismaService.pacientes.findUnique({
        where: { user: paciente.user },
      });

      if (userExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Usuário informado já está cadastrado!',
        });
      }

      const resultCreate = await this.prismaService.pacientes.create({
        data: paciente,
      });

      return !!resultCreate;
    } catch (error) {
      console.log(error);
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar o cadastro do paciente!',
        error,
        status: 500,
      });
    }
  }
}
