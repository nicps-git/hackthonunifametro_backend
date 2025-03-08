import { TRealizarConsultaSchema } from '../schemas/consulta.schema';

export interface TResultListConsultasPaciente {
  id: string;
  data: Date;
  horario: string;
  laudoMedico: string;
  prescricaoMedica: string;
  afastamento: Date | null;
  retorno: Date | null;
  medico: {
    nome: string;
    sobrenome: string;
    crm: string;
    cnpj: string;
    especialidade: string;
  };
}

export abstract class ConsultaRepositories {
  abstract iniciarConsulta(idAgendamento: string): Promise<boolean>;

  abstract realizarConsulta(data: TRealizarConsultaSchema): Promise<boolean>;

  abstract listarConsultasPaciente(
    idPaciente: string,
  ): Promise<TResultListConsultasPaciente[]>;
}
