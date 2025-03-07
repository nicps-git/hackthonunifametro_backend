import { MedicoDisponibilidadeRepositories } from '@/application/repositories/medicoDisponibilidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteHourMedicoDisponibilidadeUseCase {
  constructor(
    private medicoDisponibilidadeRepositories: MedicoDisponibilidadeRepositories,
  ) {}

  async execute(
    idMedico: string,
    diaSemana: string,
    horario: string,
  ): Promise<boolean> {
    const result = await this.medicoDisponibilidadeRepositories.deleteHour(
      idMedico,
      diaSemana,
      horario,
    );

    return result;
  }
}
