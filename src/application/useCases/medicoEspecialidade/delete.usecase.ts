import { MedicoEspecialidadeRepositories } from '@/application/repositories/medicoEspecialidade.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteMedicoEspecialidadeUseCase {
  constructor(
    private medicoEspecialidadeRepositories: MedicoEspecialidadeRepositories,
  ) {}

  async execute(id: string): Promise<boolean> {
    const result = await this.medicoEspecialidadeRepositories.delete(id);

    return result;
  }
}
