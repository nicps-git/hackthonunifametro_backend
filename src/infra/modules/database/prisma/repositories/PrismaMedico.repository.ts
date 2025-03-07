import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  IMedicoResult,
  MedicoRepositories,
} from '@/application/repositories/medico.repository';
import { IResultMedicoDisponibilidadeRepository } from '@/application/repositories/medicoDisponibilidade.repository';
import { getWeekDay } from '@/application/utils';

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

  async getDisponibilidadeMedicoByDataAgendamento(
    idMedico: string,
    dataAgendamento: Date,
  ): Promise<IResultMedicoDisponibilidadeRepository[]> {
    try {
      const agendamentoDate = new Date(dataAgendamento);

      const medicoAgendamento = await this.prismaService.agendamento.findMany({
        where: {
          idMedico,
          data: agendamentoDate,
        },
      });

      if (medicoAgendamento.length > 0) {
        throw new GetError({
          title: 'Implementar',
          message:
            'Já existe agendamento para esta data, verificar horários disponíveis',
        });
      }

      const weekDay = getWeekDay(agendamentoDate);

      const result = await this.prismaService.medicoDisponibilidade.findMany({
        where: {
          idMedico,
          diaSemana: weekDay,
        },
      });

      return result;
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message:
          'Erro ao buscar disponibilidade do médico por data do agendamento',
        error,
        status: 500,
      });
    }
  }
}
