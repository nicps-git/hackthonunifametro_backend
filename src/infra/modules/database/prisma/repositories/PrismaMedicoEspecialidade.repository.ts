import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IResultMedicoEspecialidadeRepository,
  MedicoEspecialidadeRepositories,
} from '@/application/repositories/medicoEspecialidade.repository';
import { TMedicoEspecialidadeSchema } from '@/application/schemas/medicoEspecialidade.schema';
import { GetError } from '@/application/errors';

@Injectable()
export class PrismaMedicoEspecialidadeRepositories
  implements MedicoEspecialidadeRepositories
{
  constructor(private prismaService: PrismaService) {}

  async create(data: TMedicoEspecialidadeSchema): Promise<boolean> {
    try {
      const isExists = await this.prismaService.medicoEspecialidade.findFirst({
        where: {
          nome: data.nome,
        },
      });

      if (isExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Especialidade informada já está cadastrada!',
        });
      }

      const result = await this.prismaService.medicoEspecialidade.create({
        data: {
          ...data,
        },
      });

      return !!result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar o cadastro da especialidade do médico!',
        error,
        status: 500,
      });
    }
  }

  async update(id: string, data: TMedicoEspecialidadeSchema): Promise<boolean> {
    try {
      const isExists = await this.prismaService.medicoEspecialidade.findUnique({
        where: {
          id,
        },
      });

      if (!isExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Especialidade informada não foi encontrada!',
        });
      }

      const result = await this.prismaService.medicoEspecialidade.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });

      return !!result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a atualização da especialidade do médico!',
        error,
        status: 500,
      });
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const isExists = await this.prismaService.medicoEspecialidade.findUnique({
        where: {
          id,
        },
      });

      if (!isExists) {
        throw new GetError({
          title: 'Ação negada',
          message: 'Especialidade informada não foi encontrada!',
        });
      }

      const result = await this.prismaService.medicoEspecialidade.delete({
        where: {
          id,
        },
      });

      return !!result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a exclusão da especialidade do médico!',
        error,
        status: 500,
      });
    }
  }

  async list(): Promise<IResultMedicoEspecialidadeRepository[]> {
    try {
      const result = await this.prismaService.medicoEspecialidade.findMany();

      return result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a listagem das especialidades do médico!',
        error,
        status: 500,
      });
    }
  }

  async findById(
    id: string,
  ): Promise<IResultMedicoEspecialidadeRepository | null> {
    try {
      const result = await this.prismaService.medicoEspecialidade.findUnique({
        where: {
          id,
        },
      });

      return result;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a busca da especialidade do médico!',
        error,
        status: 500,
      });
    }
  }
}
