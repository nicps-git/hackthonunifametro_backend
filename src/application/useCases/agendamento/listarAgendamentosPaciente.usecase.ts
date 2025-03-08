import {
  AgendamentoRepositories,
  TResultListAgendamentosPaciente,
} from '@/application/repositories/agendamento.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarAgendamentosPacienteUseCase {
  constructor(private agendamentoRepositories: AgendamentoRepositories) {}

  async execute(
    idPaciente: string,
  ): Promise<TResultListAgendamentosPaciente[]> {
    const result =
      await this.agendamentoRepositories.listarAgendamentosPaciente(idPaciente);

    return result;
  }
}
