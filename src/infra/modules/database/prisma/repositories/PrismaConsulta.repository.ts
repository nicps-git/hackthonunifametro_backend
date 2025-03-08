import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  ConsultaRepositories,
  TResultListConsultasPaciente,
} from '@/application/repositories/consulta.repository';
import { TRealizarConsultaSchema } from '@/application/schemas/consulta.schema';

@Injectable()
export class PrismaConsultaRepositories implements ConsultaRepositories {
  constructor(private prismaService: PrismaService) {}

  async iniciarConsulta(idAgendamento: string): Promise<boolean> {
    try {
      const validAgendamento = await this.prismaService.agendamento.findFirst({
        where: {
          id: idAgendamento,
        },
        include: {
          StatusAgendamento: true,
        },
      });

      if (validAgendamento?.StatusAgendamento?.nome === 'Agendado') {
        const result = await this.prismaService.agendamento.update({
          where: {
            id: idAgendamento,
          },
          data: {
            idStatusAgendamento: '2f526b2d-455b-459f-a7b0-89a2c28e9b64',
          },
        });

        return !!result;
      }

      throw new GetError({
        title: 'Ação Negada',
        message: `A consulta não foi iniciada pois o agendamento está como "${validAgendamento?.StatusAgendamento?.nome ?? 'Sem Status'}"!`,
      });
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao iniciar o agendamento!',
        error,
        status: 500,
      });
    }
  }

  async realizarConsulta(data: TRealizarConsultaSchema): Promise<boolean> {
    try {
      const validAgendamento = await this.prismaService.agendamento.findFirst({
        where: {
          id: data.idAgendamento,
        },
        include: {
          StatusAgendamento: true,
        },
      });

      if (validAgendamento?.StatusAgendamento?.nome === 'Em andamento') {
        const result = await this.prismaService.consultas.create({
          data: {
            ...data,
          },
        });

        await this.prismaService.agendamento.update({
          where: {
            id: data.idAgendamento,
          },
          data: {
            idStatusAgendamento: 'e23c0643-5133-43dc-a75f-5ec6dfc9a233',
          },
        });

        return !!result;
      }

      throw new GetError({
        title: 'Ação Negada',
        message: 'O agendamento informado ainda não foi iniciado!',
      });
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

  async listarConsultasPaciente(
    idPaciente: string,
  ): Promise<TResultListConsultasPaciente[]> {
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

      const result = await this.prismaService.consultas.findMany({
        where: {
          agendamento: {
            idPaciente,
          },
        },
        include: {
          agendamento: {
            include: {
              medico: {
                include: {
                  especialidade: true,
                },
              },
              StatusAgendamento: true,
            },
          },
        },
      });

      return result.map((item) => ({
        id: item.id,
        data: item.agendamento.data,
        horario: item.agendamento.horario,
        laudoMedico: item.laudoMedico,
        prescricaoMedica: item.prescricaoMedica,
        afastamento: item.afastamento,
        retorno: item.retorno,
        medico: {
          nome: item.agendamento.medico.nome,
          sobrenome: item.agendamento.medico.sobrenome,
          crm: item.agendamento.medico.crm,
          cnpj: item.agendamento.medico.cnpj,
          especialidade:
            item.agendamento.medico.especialidade?.nome ?? 'Sem especialidade',
        },
      }));
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar as consultas do paciente!',
        error,
        status: 500,
      });
    }
  }
}
