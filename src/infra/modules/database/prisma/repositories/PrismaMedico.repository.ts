import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  ICompleteMedicoByEspecialidadeResult,
  ICompleteMedicoResult,
  IMedicoResult,
  MedicoRepositories,
} from '@/application/repositories/medico.repository';
import { IResultMedicoDisponibilidadeRepository } from '@/application/repositories/medicoDisponibilidade.repository';
import { getWeekDay } from '@/application/utils';

@Injectable()
export class PrismaMedicoRepositories implements MedicoRepositories {
  constructor(private prismaService: PrismaService) {}

  async getDisponibilidadeMedico(
    idMedico: string,
  ): Promise<{ data: Date; horarios: string[] }[]> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setHours(today.getHours() - 3);

      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 2);
      maxDate.setHours(0, 0, 0, 0);
      maxDate.setHours(maxDate.getHours() - 3);

      const medicoDisponibilidadeTodos =
        await this.prismaService.medicoDisponibilidade.findMany({
          where: { idMedico },
        });

      const medicoAgendamento = await this.prismaService.agendamento.findMany({
        where: {
          idMedico,
          data: {
            gte: today,
            lte: maxDate,
          },
          StatusAgendamento: {
            nome: 'Agendado',
          },
        },
      });

      const disponibilidadePorDia: { [key: string]: string[] } = {};
      medicoDisponibilidadeTodos.forEach((disponibilidade) => {
        if (!disponibilidadePorDia[disponibilidade.diaSemana]) {
          disponibilidadePorDia[disponibilidade.diaSemana] = [];
        }
        disponibilidadePorDia[disponibilidade.diaSemana].push(
          disponibilidade.horario,
        );
      });

      const agendamentosPorDia: { [key: string]: { [key: string]: boolean } } =
        {};
      medicoAgendamento.forEach((agendamento) => {
        const dateStr = agendamento.data.toISOString().split('T')[0];
        if (!agendamentosPorDia[dateStr]) {
          agendamentosPorDia[dateStr] = {};
        }
        agendamentosPorDia[dateStr][agendamento.horario] = true;
      });

      const result: { data: Date; horarios: string[] }[] = [];
      for (let d = new Date(today); d <= maxDate; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = getWeekDay(d);
        if (disponibilidadePorDia[dayOfWeek]) {
          const dateStr = d.toISOString().split('T')[0];
          const horariosDisponiveis = disponibilidadePorDia[dayOfWeek].filter(
            (horario) => !agendamentosPorDia[dateStr]?.[horario],
          );
          if (horariosDisponiveis.length > 0) {
            result.push({ data: new Date(d), horarios: horariosDisponiveis });
          }
        }
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao buscar disponibilidade do médico',
        error,
        status: 500,
      });
    }
  }

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
  ): Promise<ICompleteMedicoByEspecialidadeResult[]> {
    try {
      const resultMedicos = await this.prismaService.medicos.findMany({
        where: {
          idEspecialidade,
        },
        include: {
          especialidade: true,
        },
      });

      const resultMedicosDisponibilidades: ICompleteMedicoByEspecialidadeResult[] =
        [];

      for (const medico of resultMedicos) {
        const dataDisponibilidadeMedico = await this.getDisponibilidadeMedico(
          medico.id,
        );

        resultMedicosDisponibilidades.push({
          id: medico.id,
          nome: medico.nome,
          sobrenome: medico.sobrenome,
          crm: medico.crm,
          email: medico.email,
          telefone: medico.telefone,
          cnpj: medico.cnpj,
          dataNascimento: medico.dataNascimento,
          especialidade: medico.especialidade?.nome ?? 'Sem especialidade',
          descricaoEspecialidade:
            medico.especialidade?.descricao ?? 'Sem descrição',
          sexo: medico.sexo,
          createdAt: medico.createdAt,
          updatedAt: medico.updatedAt,
          disponibilidade: dataDisponibilidadeMedico,
        });
      }

      return resultMedicosDisponibilidades;
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

  async listagemMedicos(): Promise<IMedicoResult[]> {
    try {
      const result = await this.prismaService.medicos.findMany({
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
        message: 'Erro ao buscar todos os médicos cadastrados no sistema',
        error,
        status: 500,
      });
    }
  }
}
