import { MedicoRepositories } from '@/application/repositories/medico.repository';
import { IResultMedicoDisponibilidadeRepository } from '@/application/repositories/medicoDisponibilidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetDisponibilidadeMedicoByDataAgendamentoUseCase {
  constructor(private medicoRepositories: MedicoRepositories) {}

  async execute(
    idMedico: string,
    dataAgendamento: Date,
  ): Promise<IResultMedicoDisponibilidadeRepository[]> {
    const result =
      await this.medicoRepositories.getDisponibilidadeMedicoByDataAgendamento(
        idMedico,
        dataAgendamento,
      );

    return result;
  }
}
