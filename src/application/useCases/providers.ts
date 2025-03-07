import { accessProvider } from './access/access.provider';
import { medicoDisponibilidadeProvider } from './medicoDisponibilidade/medicoDisponibilidade.provider';
import { medicoEspecialidadeProvider } from './medicoEspecialidade/medicoEspecialidade.provider';
import { userProvider } from './user/user.provider';

export const Providers = [
  ...accessProvider,
  ...userProvider,
  ...medicoEspecialidadeProvider,
  ...medicoDisponibilidadeProvider,
];
