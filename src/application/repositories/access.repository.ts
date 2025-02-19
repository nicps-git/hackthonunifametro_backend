import { TAccessSchema } from '../schemas/access.schema';

export interface IAccessRepository {
  user: string;
  password: string;
  perfil: string;
}

export abstract class AccessRepositories {
  abstract login(access: TAccessSchema): Promise<IAccessRepository | undefined>;
}
