import {
  IResultMedicoEspecialidadeRepository,
  MedicoEspecialidadeRepositories,
} from '@/application/repositories/medicoEspecialidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListMedicoEspecialidadeUseCase {
  constructor(
    private medicoEspecialidadeRepositories: MedicoEspecialidadeRepositories,
  ) {}

  async execute(): Promise<IResultMedicoEspecialidadeRepository[]> {
    const result = await this.medicoEspecialidadeRepositories.list();

    return result;
  }
}
