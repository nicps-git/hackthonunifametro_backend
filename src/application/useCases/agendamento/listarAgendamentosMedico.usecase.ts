import {
  AgendamentoRepositories,
  TResultListAgendamentosMedico,
} from '@/application/repositories/agendamento.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarAgendamentosMedicoUseCase {
  constructor(private agendamentoRepositories: AgendamentoRepositories) {}

  async execute(idMedico: string): Promise<TResultListAgendamentosMedico[]> {
    const result =
      await this.agendamentoRepositories.listarAgendamentosMedico(idMedico);

    return result;
  }
}
