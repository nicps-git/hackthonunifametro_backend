import { MedicoEspecialidadeRepositories } from '@/application/repositories/medicoEspecialidade.repository';
import { TMedicoEspecialidadeSchema } from '@/application/schemas/medicoEspecialidade.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMedicoEspecialidadeUseCase {
  constructor(
    private medicoEspecialidadeRepositories: MedicoEspecialidadeRepositories,
  ) {}

  async execute(
    id: string,
    data: TMedicoEspecialidadeSchema,
  ): Promise<boolean> {
    const result = await this.medicoEspecialidadeRepositories.update(id, {
      nome: data.nome,
      descricao: data.descricao,
    });

    return result;
  }
}
