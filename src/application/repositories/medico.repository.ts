import { IResultMedicoDisponibilidadeRepository } from './medicoDisponibilidade.repository';
import { IMedicoRepository } from './user.repository';

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

export abstract class MedicoRepositories {
  abstract getMedicoByEspecialidadeDate(
    idEspecialidade: string,
    weekDay: string,
  ): Promise<IMedicoResult[]>;

  abstract getMedicoByEspecialidade(
    idEspecialidade: string,
  ): Promise<IMedicoResult[]>;

  abstract getDisponibilidadeMedicoByDataAgendamento(
    idMedico: string,
    dataAgendamento: Date,
  ): Promise<IResultMedicoDisponibilidadeRepository[]>;
}
