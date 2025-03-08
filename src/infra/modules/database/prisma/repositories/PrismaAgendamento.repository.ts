import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetError } from '@/application/errors';
import { AgendamentoRepositories } from '@/application/repositories/agendamento.repository';
import { TRealizarAgendamentoSchema } from '@/application/schemas/agendamento.schema';

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
}
