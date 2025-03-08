import { TRealizarAgendamentoSchema } from '../schemas/agendamento.schema';

export interface TResultListAgendamentosPaciente {
  id: string;
  data: Date;
  horario: string;
  observacao: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  medico: {
    nome: string;
    sobrenome: string;
    crm: string;
    cnpj: string;
    especialidade: string;
  };
  consultas?: {
    laudoMedico: string;
    prescricaoMedica: string;
    afastamento: Date | null;
    retorno: Date | null;
  }[];
}

export abstract class AgendamentoRepositories {
  abstract realizarAgendamento(
    data: TRealizarAgendamentoSchema,
  ): Promise<boolean>;

  abstract cancelarAgendamento(
    idAgendamento: string,
    observacao: string,
  ): Promise<boolean>;

  abstract listarAgendamentosPaciente(
    idPaciente: string,
  ): Promise<TResultListAgendamentosPaciente[]>;
}
