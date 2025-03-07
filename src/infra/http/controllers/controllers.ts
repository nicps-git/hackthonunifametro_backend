import { AccessControllers } from './access.controller';
import { MedicoController } from './medico.controller';
import { DisponibilidadeController } from './medicoDisponibilidade.controller';
import { EspecialidadeController } from './medicoEspecialidade.controller';
import { UserController } from './user.controller';

export const Controllers = [
  AccessControllers,
  UserController,
  EspecialidadeController,
  DisponibilidadeController,
  MedicoController,
];
