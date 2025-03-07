import { TMedicoEspecialidadeSchema } from '../schemas/medicoEspecialidade.schema';

export interface IResultMedicoEspecialidadeRepository {
  id: string;
  nome: string;
  descricao: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class MedicoEspecialidadeRepositories {
  abstract create(data: TMedicoEspecialidadeSchema): Promise<boolean>;

  abstract update(
    id: string,
    data: TMedicoEspecialidadeSchema,
  ): Promise<boolean>;

  abstract delete(id: string): Promise<boolean>;

  abstract list(): Promise<IResultMedicoEspecialidadeRepository[]>;

  abstract findById(
    id: string,
  ): Promise<IResultMedicoEspecialidadeRepository | null>;
}
