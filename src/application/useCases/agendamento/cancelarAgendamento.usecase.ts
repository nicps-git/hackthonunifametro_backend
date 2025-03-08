import { AgendamentoRepositories } from '@/application/repositories/agendamento.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CancelarAgendamentoUseCase {
  constructor(private agendamentoRepositories: AgendamentoRepositories) {}

  async execute(idAgendamento: string, observacao: string): Promise<boolean> {
    const result = await this.agendamentoRepositories.cancelarAgendamento(
      idAgendamento,
      observacao,
    );

    return result;
  }
}
