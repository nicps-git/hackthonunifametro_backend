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
      const result = await this.prismaService.medicos.findMany({
        where: {
          disponibilidade: {
            some: {
              diaSemana: weekDay,
            },
          },
          idEspecialidade,
        },
        include: { especialidade: true },
      });

      return result.map((item) => {
        return {
          id: item.id,
          nome: item.nome,
          sobrenome: item.sobrenome,
          crm: item.crm,
          email: item.email,
          telefone: item.telefone,
          cnpj: item.cnpj,
          dataNascimento: item.dataNascimento,
          especialidade: item.especialidade?.nome ?? 'Sem especialidade',
          descricaoEspecialidade:
            item.especialidade?.descricao ?? 'Sem descrição',
          sexo: item.sexo,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
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

  async getMedicoByEspecialidade(
    idEspecialidade: string,
  ): Promise<IMedicoResult[]> {
    try {
      const result = await this.prismaService.medicos.findMany({
        where: {
          idEspecialidade,
        },
        include: {
          especialidade: true,
        },
      });

      return result.map((item) => {
        return {
          id: item.id,
          nome: item.nome,
          sobrenome: item.sobrenome,
          crm: item.crm,
          email: item.email,
          telefone: item.telefone,
          cnpj: item.cnpj,
          dataNascimento: item.dataNascimento,
          especialidade: item.especialidade?.nome ?? 'Sem especialidade',
          descricaoEspecialidade:
            item.especialidade?.descricao ?? 'Sem descrição',
          sexo: item.sexo,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao buscar médicos por especialidade',
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
          StatusAgendamento: {
            nome: 'Agendado',
          },
        },
      });

      const weekDay = getWeekDay(agendamentoDate);

      const resultDoctorDiponibilidade =
        await this.prismaService.medicoDisponibilidade.findMany({
          where: {
            idMedico,
            diaSemana: weekDay,
          },
        });

      if (medicoAgendamento.length > 0) {
        const horariosDisponiveis = resultDoctorDiponibilidade.filter(
          (item) =>
            !medicoAgendamento.some(
              (agendamento) => agendamento.horario === item.horario,
            ),
        );

        return horariosDisponiveis;
      }

      return resultDoctorDiponibilidade;
    } catch (error) {
      // console.error(error);

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
