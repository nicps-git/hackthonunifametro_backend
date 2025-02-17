import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaRepositories } from './repositories/prisma.repository';
import { DatabaseRepositoriesModule } from '@/application/repositories/repository.module';

@Module({
  providers: [PrismaService, ...PrismaRepositories],
  exports: [...DatabaseRepositoriesModule],
})
export class PrismaModule {}
