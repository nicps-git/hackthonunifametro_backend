import { IResultMedicoDisponibilidadeRepository } from './medicoDisponibilidade.repository';

export interface IMedicoResult {
  id: string;
  nome: string;
  sobrenome: string;
  crm: string;
  email: string;
  telefone: string;
  cnpj: string;
  dataNascimento: string;
  especialidade: string;
  descricaoEspecialidade: string;
  sexo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompleteMedicoResult extends IMedicoResult {
  disponibilidade: IResultMedicoDisponibilidadeRepository[];
}

export interface IMedicoDisponibilidadeResult {
  data: Date;
  horarios: string[];
}

export interface ICompleteMedicoByEspecialidadeResult extends IMedicoResult {
  disponibilidade: IMedicoDisponibilidadeResult[];
}

export abstract class MedicoRepositories {
  abstract getMedicoByEspecialidadeDate(
    idEspecialidade: string,
    weekDay: string,
  ): Promise<IMedicoResult[]>;

  abstract getMedicoByEspecialidade(
    idEspecialidade: string,
  ): Promise<ICompleteMedicoByEspecialidadeResult[]>;

  abstract getDisponibilidadeMedicoByDataAgendamento(
    idMedico: string,
    dataAgendamento: Date,
  ): Promise<IResultMedicoDisponibilidadeRepository[]>;
}
