import { AccessControllers } from './access.controller';
import { AgendamentoController } from './agendamento.controller';
import { ConsultaController } from './consulta.controller';
import { MedicoController } from './medico.controller';
import { DisponibilidadeController } from './medicoDisponibilidade.controller';
import { EspecialidadeController } from './medicoEspecialidade.controller';
import { PacienteController } from './paciente.controller';
import { UserController } from './user.controller';

export const Controllers = [
  AccessControllers,
  UserController,
  EspecialidadeController,
  DisponibilidadeController,
  MedicoController,
  AgendamentoController,
  ConsultaController,
  PacienteController,
];
