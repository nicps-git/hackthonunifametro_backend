import { AgendamentoRepositories } from '@/application/repositories/agendamento.repository';
import { TRealizarAgendamentoSchema } from '@/application/schemas/agendamento.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RealizarAgendamentoUseCase {
  constructor(private agendamentoRepositories: AgendamentoRepositories) {}

  async execute(request: TRealizarAgendamentoSchema): Promise<boolean> {
    const result = await this.agendamentoRepositories.realizarAgendamento({
      ...request,
      data: new Date(request.data),
    });

    return result;
  }
}
