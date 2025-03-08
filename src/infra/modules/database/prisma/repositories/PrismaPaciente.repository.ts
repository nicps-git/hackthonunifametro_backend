import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  IPacientesResult,
  PacienteRepositories,
} from '@/application/repositories/paciente.repository';

@Injectable()
export class PrismaPacienteRepositories implements PacienteRepositories {
  constructor(private prismaService: PrismaService) {}

  async listagemPacientes(): Promise<IPacientesResult[]> {
    try {
      const pacientes = await this.prismaService.pacientes.findMany({
        include: {
          endereco: true,
          perfil: true,
        },
      });

      return pacientes.map((paciente) => ({
        id: paciente.id,
        nome: paciente.nome,
        sobrenome: paciente.sobrenome,
        cpf: paciente.cpf,
        dataNascimento: paciente.dataNascimento,
        telefone: paciente.telefone,
        email: paciente.email,
        sexo: paciente.sexo,
        user: paciente.user,
        perfil: paciente.perfil.nome,
        endereco: paciente.endereco,
        createdAt: paciente.createdAt,
        updatedAt: paciente.updatedAt,
      }));
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao buscar todos os pacientes cadastrados no sistema',
        error,
        status: 500,
      });
    }
  }
}
