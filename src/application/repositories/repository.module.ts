import { AccessRepositories } from './access.repository';
import { AgendamentoRepositories } from './agendamento.repository';
import { ConsultaRepositories } from './consulta.repository';
import { MedicoRepositories } from './medico.repository';
import { MedicoDisponibilidadeRepositories } from './medicoDisponibilidade.repository';
import { MedicoEspecialidadeRepositories } from './medicoEspecialidade.repository';
import { PacienteRepositories } from './paciente.repository';
import { UserRepositories } from './user.repository';

export const DatabaseRepositoriesModule = [
  UserRepositories,
  AccessRepositories,
  MedicoEspecialidadeRepositories,
  MedicoDisponibilidadeRepositories,
  MedicoRepositories,
  AgendamentoRepositories,
  ConsultaRepositories,
  PacienteRepositories,
];
