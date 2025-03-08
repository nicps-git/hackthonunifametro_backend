import { AccessRepositories } from './access.repository';
import { AgendamentoRepositories } from './agendamento.repository';
import { MedicoRepositories } from './medico.repository';
import { MedicoDisponibilidadeRepositories } from './medicoDisponibilidade.repository';
import { MedicoEspecialidadeRepositories } from './medicoEspecialidade.repository';
import { UserRepositories } from './user.repository';

export const DatabaseRepositoriesModule = [
  UserRepositories,
  AccessRepositories,
  MedicoEspecialidadeRepositories,
  MedicoDisponibilidadeRepositories,
  MedicoRepositories,
  AgendamentoRepositories,
];
