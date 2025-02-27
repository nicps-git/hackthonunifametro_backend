import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  IMedicoRepository,
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

      const resultCreate = await this.prismaService.enderecos.create({
        data: {
          ...paciente.endereco,
          pacientes: {
            create: {
              idPerfil: 'f3b2a0f7-5b7c-4d7f-8a1c-2b6b3f1e0b3b',
              nome: paciente.nome,
              sobrenome: paciente.sobrenome,
              cpf: paciente.cpf,
              dataNascimento: paciente.dataNascimento,
              sexo: paciente.sexo,
              telefone: paciente.telefone,
              email: paciente.email,
              password: paciente.password,
              user: paciente.user,
            },
          },
        },
      });

      return !!resultCreate;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar o cadastro do paciente!',
        error,
        status: 500,
      });
    }
  }

  async registerMedico(medico: IMedicoRepository): Promise<boolean> {
    try {
      const userExists = await this.prismaService.medicos.findUnique({
        where: { user: medico.user },
      });

      if (userExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Usuário informado já está cadastrado!',
        });
      }

      const resultCreate = await this.prismaService.enderecos.create({
        data: {
          ...medico.endereco,
          medicos: {
            create: {
              idPerfil: 'e3b2a0f7-5b7c-4d7f-8a1c-2b6b3f1e0b3b',
              nome: medico.nome,
              sobrenome: medico.sobrenome,
              cnpj: medico.cnpj,
              crm: medico.crm,
              dataNascimento: medico.dataNascimento,
              sexo: medico.sexo,
              telefone: medico.telefone,
              email: medico.email,
              password: medico.password,
              user: medico.user,
            },
          },
        },
      });

      return !!resultCreate;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar o cadastro do medico!',
        error,
        status: 500,
      });
    }
  }
}
