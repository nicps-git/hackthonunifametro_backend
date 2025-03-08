import { IRepositories } from '@/application/interfaces/repository.interface';
import { AccessRepositories } from '@/application/repositories/access.repository';
import { PrismaAccessRepositories } from './PrismaAccess.repository';
import { UserRepositories } from '@/application/repositories/user.repository';
import { PrismaUserRepositories } from './PrismaUser.repository';
import { MedicoEspecialidadeRepositories } from '@/application/repositories/medicoEspecialidade.repository';
import { PrismaMedicoEspecialidadeRepositories } from './PrismaMedicoEspecialidade.repository';
import { MedicoDisponibilidadeRepositories } from '@/application/repositories/medicoDisponibilidade.repository';
import { PrismaMedicoDisponibilidadeRepositories } from './PrismaMedicoDisponibilidade.repository';
import { MedicoRepositories } from '@/application/repositories/medico.repository';
import { PrismaMedicoRepositories } from './PrismaMedico.repository';
import { AgendamentoRepositories } from '@/application/repositories/agendamento.repository';
import { PrismaAgendamentoRepositories } from './PrismaAgendamento.repository';
import { ConsultaRepositories } from '@/application/repositories/consulta.repository';
import { PrismaConsultaRepositories } from './PrismaConsulta.repository';

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
  {
    provide: MedicoDisponibilidadeRepositories,
    useClass: PrismaMedicoDisponibilidadeRepositories,
  },
  {
    provide: MedicoRepositories,
    useClass: PrismaMedicoRepositories,
  },
  {
    provide: AgendamentoRepositories,
    useClass: PrismaAgendamentoRepositories,
  },
  {
    provide: ConsultaRepositories,
    useClass: PrismaConsultaRepositories,
  },
];
