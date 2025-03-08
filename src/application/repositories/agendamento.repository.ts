import { TRealizarAgendamentoSchema } from '../schemas/agendamento.schema';

export abstract class AgendamentoRepositories {
  abstract realizarAgendamento(
    data: TRealizarAgendamentoSchema,
  ): Promise<boolean>;
}
