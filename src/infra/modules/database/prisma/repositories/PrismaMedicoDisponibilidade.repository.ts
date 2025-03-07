import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import {
  IResultMedicoDisponibilidadeRepository,
  MedicoDisponibilidadeRepositories,
} from '@/application/repositories/medicoDisponibilidade.repository';
import { TMedicoDisponibilidadeSchema } from '@/application/schemas/medicoDisponibilidade.schema';

@Injectable()
export class PrismaMedicoDisponibilidadeRepositories
  implements MedicoDisponibilidadeRepositories
{
  constructor(private prismaService: PrismaService) {}

  async create(data: TMedicoDisponibilidadeSchema[]): Promise<boolean> {
    try {
      for (const item of data) {
        const isExists =
          await this.prismaService.medicoDisponibilidade.findFirst({
            where: {
              idMedico: item.idMedico,
              diaSemana: item.diaSemana,
              horario: item.horario,
            },
          });

        if (!isExists) {
          await this.prismaService.medicoDisponibilidade.create({
            data: {
              ...item,
            },
          });
        }
      }

      return true;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar o cadastro da disponibilidade do médico!',
        error,
        status: 500,
      });
    }
  }

  async deleteWeekDay(idMedico: string, diaSemana: string): Promise<boolean> {
    try {
      const isExists = await this.prismaService.medicoDisponibilidade.findFirst(
        {
          where: {
            idMedico,
            diaSemana,
          },
        },
      );

      if (!isExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Dia da semana informado não foi encontrado!',
        });
      }

      const result = await this.prismaService.medicoDisponibilidade.deleteMany({
        where: {
          idMedico,
          diaSemana,
        },
      });

      return !!result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message:
          'Erro ao deletar o dia da semana de disponibilidade do médico!',
        error,
        status: 500,
      });
    }
  }

  async deleteHour(
    idMedico: string,
    diaSemana: string,
    horario: string,
  ): Promise<boolean> {
    try {
      const isExists = await this.prismaService.medicoDisponibilidade.findFirst(
        {
          where: {
            idMedico,
            diaSemana,
            horario,
          },
        },
      );

      if (!isExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Dia da semana ou horário informado não foi encontrado!',
        });
      }

      const result = await this.prismaService.medicoDisponibilidade.deleteMany({
        where: {
          idMedico,
          diaSemana,
          horario,
        },
      });

      return !!result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao deletar o horário de disponibilidade do médico!',
        error,
        status: 500,
      });
    }
  }

  async list(
    idMedico: string,
  ): Promise<IResultMedicoDisponibilidadeRepository[]> {
    try {
      const result = await this.prismaService.medicoDisponibilidade.findMany({
        where: {
          idMedico,
        },
      });

      return result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar disponibilidade do médico!',
        error,
        status: 500,
      });
    }
  }

  async clear(idMedico: string): Promise<boolean> {
    try {
      const result = await this.prismaService.medicoDisponibilidade.deleteMany({
        where: {
          idMedico,
        },
      });

      return !!result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao limpar disponibilidade do médico!',
        error,
        status: 500,
      });
    }
  }
}
