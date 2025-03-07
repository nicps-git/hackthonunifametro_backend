import { MedicoDisponibilidadeRepositories } from '@/application/repositories/medicoDisponibilidade.repository';
import { TMedicoDisponibilidadeSchema } from '@/application/schemas/medicoDisponibilidade.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateMedicoDisponibilidadeUseCase {
  constructor(
    private medicoDisponibilidadeRepositories: MedicoDisponibilidadeRepositories,
  ) {}

  async execute(request: TMedicoDisponibilidadeSchema[]): Promise<boolean> {
    const result = await this.medicoDisponibilidadeRepositories.create(request);

    return result;
  }
}
