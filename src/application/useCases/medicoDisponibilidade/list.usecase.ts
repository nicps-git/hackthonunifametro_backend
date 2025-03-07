import {
  IResultMedicoDisponibilidadeRepository,
  MedicoDisponibilidadeRepositories,
} from '@/application/repositories/medicoDisponibilidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListMedicoDisponibilidadeUseCase {
  constructor(
    private medicoDisponibilidadeRepositories: MedicoDisponibilidadeRepositories,
  ) {}

  async execute(
    idMedico: string,
  ): Promise<IResultMedicoDisponibilidadeRepository[]> {
    const result = await this.medicoDisponibilidadeRepositories.list(idMedico);

    return result;
  }
}
