import { IRepositories } from '@/application/interfaces/repository.interface';
import { AccessRepositories } from '@/application/repositories/access.repository';
import { PrismaAccessRepositories } from './PrismaAccess.repository';
import { UserRepositories } from '@/application/repositories/user.repository';
import { PrismaUserRepositories } from './PrismaUser.repository';
import { MedicoEspecialidadeRepositories } from '@/application/repositories/medicoEspecialidade.repository';
import { PrismaMedicoEspecialidadeRepositories } from './PrismaMedicoEspecialidade.repository';

export const PrismaRepositories: IRepositories[] = [
  {
    provide: AccessRepositories,
    useClass: PrismaAccessRepositories,
  },
  {
    provide: UserRepositories,
    useClass: PrismaUserRepositories,
  },
  {
    provide: MedicoEspecialidadeRepositories,
    useClass: PrismaMedicoEspecialidadeRepositories,
  },
];
