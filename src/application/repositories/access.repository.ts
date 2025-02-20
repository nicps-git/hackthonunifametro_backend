import { TAccessSchema } from '../schemas/access.schema';

export interface IAccessRepository {
  user: string;
  password: string;
  perfil: string;
}

export abstract class AccessRepositories {
  abstract login(access: TAccessSchema): Promise<IAccessRepository | undefined>;

  abstract requestResetPassword(email: string): Promise<boolean>;

  abstract saveCodeResetPassword(email: string, code: string): Promise<boolean>;

  abstract resetPassword(password: string, code: string): Promise<boolean>;

  abstract disableCodeResetPassword(code: string): Promise<void>;
}
