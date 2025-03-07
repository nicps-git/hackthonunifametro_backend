import { MedicoDisponibilidadeRepositories } from '@/application/repositories/medicoDisponibilidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClearMedicoDisponibilidadeUseCase {
  constructor(
    private medicoDisponibilidadeRepositories: MedicoDisponibilidadeRepositories,
  ) {}

  async execute(idMedico: string): Promise<boolean> {
    const result = await this.medicoDisponibilidadeRepositories.clear(idMedico);

    return result;
  }
}
