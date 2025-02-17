import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      this.logger.log('Conectando Banco de dados...');

      await this.$connect();

      this.logger.log('Banco conectado!');
    } catch (error) {
      this.logger.error(
        'Não foi possível realizar conexão com o banco de dados!',
        error,
      );
    }
  }

  async onModuleDestroy() {
    this.logger.log('Desconectando Banco de dados...');

    await this.$disconnect();

    this.logger.log('Banco desconectado!');
  }
}
