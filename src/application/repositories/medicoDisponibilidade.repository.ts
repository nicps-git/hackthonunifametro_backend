import { TMedicoDisponibilidadeSchema } from '../schemas/medicoDisponibilidade.schema';

export interface IResultMedicoDisponibilidadeRepository {
  id: string;
  idMedico: string;
  diaSemana: string;
  horario: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class MedicoDisponibilidadeRepositories {
  abstract create(data: TMedicoDisponibilidadeSchema[]): Promise<boolean>;

  abstract deleteWeekDay(idMedico: string, diaSemana: string): Promise<boolean>;

  abstract deleteHour(
    idMedico: string,
    diaSemana: string,
    horario: string,
  ): Promise<boolean>;

  abstract list(
    idMedico: string,
  ): Promise<IResultMedicoDisponibilidadeRepository[]>;

  abstract clear(idMedico: string): Promise<boolean>;
}
