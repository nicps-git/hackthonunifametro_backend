import {
  IResultMedicoEspecialidadeRepository,
  MedicoEspecialidadeRepositories,
} from '@/application/repositories/medicoEspecialidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdMedicoEspecialidadeUseCase {
  constructor(
    private medicoEspecialidadeRepositories: MedicoEspecialidadeRepositories,
  ) {}

  async execute(
    id: string,
  ): Promise<IResultMedicoEspecialidadeRepository | null> {
    const result = await this.medicoEspecialidadeRepositories.findById(id);

    return result;
  }
}
