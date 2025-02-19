import {
  AccessRepositories,
  IAccessRepository,
} from '@/application/repositories/access.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TAccessSchema } from '@/application/schemas/access.schema';
import { GetError } from '@/application/errors';

@Injectable()
export class PrismaAccessRepositories implements AccessRepositories {
  constructor(private prismaService: PrismaService) {}

  async login(access: TAccessSchema): Promise<IAccessRepository | undefined> {
    try {
      let dataUser;

      if (access.user.length === 11) {
        dataUser = await this.prismaService.pacientes.findUnique({
          where: { user: access.user },
          include: {
            perfil: true,
          },
        });
      }

      if (dataUser) {
        return {
          user: dataUser.user,
          password: dataUser.password,
          perfil: dataUser.perfil.nome,
        };
      }

      return undefined;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a autenticação do usuário!',
        error,
        status: 500,
      });
    }
  }
}
