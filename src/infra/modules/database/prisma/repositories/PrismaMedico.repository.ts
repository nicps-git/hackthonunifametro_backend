import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  IMedicoResult,
  MedicoRepositories,
} from '@/application/repositories/medico.repository';

@Injectable()
export class PrismaMedicoRepositories implements MedicoRepositories {
  constructor(private prismaService: PrismaService) {}

  async getMedicoByEspecialidadeDate(
    idEspecialidade: string,
    weekDay: string,
  ): Promise<IMedicoResult[]> {
    try {
      const result = await this.prismaService.medicoDisponibilidade.findMany({
        where: {
          diaSemana: weekDay,
          medicos: {
            especialidade: {
              id: idEspecialidade,
            },
          },
        },
        include: {
          medicos: {
            include: { especialidade: true },
          },
        },
      });

      return result.map((item) => {
        return {
          id: item.medicos.id,
          nome: item.medicos.nome,
          sobrenome: item.medicos.sobrenome,
          crm: item.medicos.crm,
          email: item.medicos.email,
          telefone: item.medicos.telefone,
          cnpj: item.medicos.cnpj,
          dataNascimento: item.medicos.dataNascimento,
          especialidade:
            item.medicos.especialidade?.nome ?? 'Sem especialidade',
          descricaoEspecialidade:
            item.medicos.especialidade?.descricao ?? 'Sem descrição',
          sexo: item.medicos.sexo,
          createdAt: item.medicos.createdAt,
          updatedAt: item.medicos.updatedAt,
        };
      });
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message:
          'Erro ao buscar médicos por especialidade e data do agendamento',
        error,
        status: 500,
      });
    }
  }
}
