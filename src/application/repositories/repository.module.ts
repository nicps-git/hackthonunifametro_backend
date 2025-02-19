import { AccessRepositories } from './access.repository';
import { UserRepositories } from './user.repository';

export const DatabaseRepositoriesModule = [
  UserRepositories,
  AccessRepositories,
];
