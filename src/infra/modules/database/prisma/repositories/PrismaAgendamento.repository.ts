import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  AgendamentoRepositories,
  TResultListAgendamentosMedico,
  TResultListAgendamentosPaciente,
} from '@/application/repositories/agendamento.repository';
import { TRealizarAgendamentoSchema } from '@/application/schemas/agendamento.schema';
import { getWeekDay } from '@/application/utils';

@Injectable()
export class PrismaAgendamentoRepositories implements AgendamentoRepositories {
  constructor(private prismaService: PrismaService) {}

  async realizarAgendamento(
    data: TRealizarAgendamentoSchema,
  ): Promise<boolean> {
    try {
      const agendamentoExists = await this.prismaService.agendamento.findFirst({
        where: {
          idMedico: data.idMedico,
          data: data.data,
          horario: data.horario,
        },
      });

      const weekDay = getWeekDay(data.data);

      const medicoDisponibilidade =
        await this.prismaService.medicoDisponibilidade.findMany({
          where: {
            idMedico: data.idMedico,
          },
        });

      const medicoDisponibilidadeExists = medicoDisponibilidade.find(
        (item) => item.diaSemana === weekDay,
      );

      if (!medicoDisponibilidadeExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Médico não possui disponibilidade para este dia!',
        });
      }

      if (agendamentoExists) {
        throw new GetError({
          title: 'Ação negada',
          message:
            'Já existe um agendamento cadastrado para o médico nesta data e horário!',
        });
      }

      const result = await this.prismaService.agendamento.create({
        data: {
          ...data,
          idStatusAgendamento: '8694e5ab-44cd-47bf-9050-51b53ba7b816',
        },
      });

      return !!result;
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar o cadastro do agendamento!',
        error,
        status: 500,
      });
    }
  }

  async cancelarAgendamento(idAgendamento: string): Promise<boolean> {
    try {
      const result = await this.prismaService.agendamento.update({
        where: {
          id: idAgendamento,
        },
        data: {
          idStatusAgendamento: '6fee2d61-0a60-4f60-b3b0-17265a453bc5',
        },
      });

      return !!result;
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao cancelar o agendamento!',
        error,
        status: 500,
      });
    }
  }

  async listarAgendamentosPaciente(
    idPaciente: string,
  ): Promise<TResultListAgendamentosPaciente[]> {
    try {
      const pacienteExists = await this.prismaService.pacientes.findFirst({
        where: {
          id: idPaciente,
        },
      });

      if (!pacienteExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Paciente não encontrado!',
        });
      }

      const result = await this.prismaService.agendamento.findMany({
        where: {
          idPaciente,
        },
        include: {
          medico: {
            include: {
              especialidade: true,
            },
          },
          StatusAgendamento: true,
          Consultas: true,
        },
      });

      return result.map((item) => ({
        id: item.id,
        data: item.data,
        horario: item.horario,
        idMedico: item.idMedico,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        medico: {
          cnpj: item.medico.cnpj,
          crm: item.medico.crm,
          especialidade: item.medico.especialidade?.nome ?? 'Sem especialidade',
          nome: item.medico.nome,
          sobrenome: item.medico.sobrenome,
        },
        observacao: item.observacao,
        status: item.StatusAgendamento?.nome ?? 'Sem status',
        consultas:
          item.Consultas?.map((consulta) => ({
            laudoMedico: consulta.laudoMedico,
            prescricaoMedica: consulta.prescricaoMedica,
            afastamento: consulta.afastamento,
            retorno: consulta.retorno,
          })) ?? [],
      }));
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar os agendamentos do paciente!',
        error,
        status: 500,
      });
    }
  }

  async listarAgendamentosMedico(
    idMedico: string,
  ): Promise<TResultListAgendamentosMedico[]> {
    try {
      const medicoExists = await this.prismaService.medicos.findFirst({
        where: {
          id: idMedico,
        },
      });

      if (!medicoExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Médico não encontrado!',
        });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setHours(today.getHours() - 3);

      const result = await this.prismaService.agendamento.findMany({
        where: {
          idMedico,
          data: today,
        },
        include: {
          paciente: true,
          StatusAgendamento: true,
          Consultas: true,
        },
      });

      return result.map((item) => ({
        id: item.id,
        data: item.data,
        horario: item.horario,
        idMedico: item.idMedico,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        observacao: item.observacao,
        status: item.StatusAgendamento?.nome ?? 'Sem status',
        paciente: {
          cpf: item.paciente.cpf,
          dataNascimento: item.paciente.dataNascimento,
          nome: item.paciente.nome,
          sobrenome: item.paciente.sobrenome,
        },
        consultas:
          item.Consultas?.map((consulta) => ({
            laudoMedico: consulta.laudoMedico,
            prescricaoMedica: consulta.prescricaoMedica,
            afastamento: consulta.afastamento,
            retorno: consulta.retorno,
          })) ?? [],
      }));
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar os agendamentos do médico!',
        error,
        status: 500,
      });
    }
  }
}
