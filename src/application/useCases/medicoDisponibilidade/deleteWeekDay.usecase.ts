import { MedicoDisponibilidadeRepositories } from '@/application/repositories/medicoDisponibilidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteWeekDayMedicoDisponibilidadeUseCase {
  constructor(
    private medicoDisponibilidadeRepositories: MedicoDisponibilidadeRepositories,
  ) {}

  async execute(idMedico: string, diaSemana: string): Promise<boolean> {
    const result = await this.medicoDisponibilidadeRepositories.deleteWeekDay(
      idMedico,
      diaSemana,
    );

    return result;
  }
}
