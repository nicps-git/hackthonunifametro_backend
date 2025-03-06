import { AccessRepositories } from './access.repository';
import { MedicoEspecialidadeRepositories } from './medicoEspecialidade.repository';
import { UserRepositories } from './user.repository';

export const DatabaseRepositoriesModule = [
  UserRepositories,
  AccessRepositories,
  MedicoEspecialidadeRepositories,
];
