import { MedicoEspecialidadeRepositories } from '@/application/repositories/medicoEspecialidade.repository';
import { TMedicoEspecialidadeSchema } from '@/application/schemas/medicoEspecialidade.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateMedicoEspecialidadeUseCase {
  constructor(
    private medicoEspecialidadeRepositories: MedicoEspecialidadeRepositories,
  ) {}

  async execute(request: TMedicoEspecialidadeSchema): Promise<boolean> {
    const result = await this.medicoEspecialidadeRepositories.create(request);

    return result;
  }
}
