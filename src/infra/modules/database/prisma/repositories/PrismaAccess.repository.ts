import {
  AccessRepositories,
  IAccessRepository,
  IResultResetPassword,
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

  async requestResetPassword(email: string): Promise<boolean> {
    try {
      const dataUser = await this.prismaService.pacientes.findUnique({
        where: { email },
      });

      if (dataUser) {
        return true;
      }

      return false;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a solicitação de recuperação de senha!',
        error,
        status: 500,
      });
    }
  }

  async saveCodeResetPassword(email: string, code: string): Promise<boolean> {
    try {
      const existsUserCodeEnabled =
        await this.prismaService.resetPasswordCodes.findMany({
          where: { email, disabled: false },
        });

      if (existsUserCodeEnabled.length > 0) {
        existsUserCodeEnabled.forEach(async (data) => {
          await this.prismaService.resetPasswordCodes.update({
            where: { id: data.id },
            data: { disabled: true },
          });
        });
      }

      const resultSave = await this.prismaService.resetPasswordCodes.create({
        data: {
          email,
          code,
        },
      });

      return !!resultSave;
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao salvar o código de recuperação de senha!',
        error,
        status: 500,
      });
    }
  }

  async resetPassword(
    password: string,
    code: string,
  ): Promise<IResultResetPassword> {
    try {
      const validateCode = await this.prismaService.resetPasswordCodes.findMany(
        {
          where: {
            code,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      );

      if (validateCode.length === 0) {
        return {
          email: '',
          success: false,
        };
      }

      if (
        validateCode[0].createdAt.getTime() + 86400000 <
        new Date().getTime()
      ) {
        return {
          email: '',
          success: false,
        };
      }

      const updateUserPassword = await this.prismaService.pacientes.update({
        where: {
          email: validateCode[0].email,
        },
        data: {
          password,
        },
      });

      if (!!updateUserPassword) {
        return {
          email: validateCode[0].email,
          success: true,
        };
      } else {
        return {
          email: '',
          success: false,
        };
      }
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a recuperação de senha!',
        error,
        status: 500,
      });
    }
  }

  async disableCodeResetPassword(code: string): Promise<void> {
    try {
      await this.prismaService.resetPasswordCodes.updateMany({
        where: { code },
        data: { disabled: true },
      });
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao desabilitar o código de recuperação de senha!',
        error,
        status: 500,
      });
    }
  }
}
