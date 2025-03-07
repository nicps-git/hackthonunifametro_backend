import {
  IMedicoResult,
  MedicoRepositories,
} from '@/application/repositories/medico.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetMedicoByEspecialidadeUseCase {
  constructor(private medicoRepositories: MedicoRepositories) {}

  async execute(idEspecialidade: string): Promise<IMedicoResult[]> {
    const result =
      await this.medicoRepositories.getMedicoByEspecialidade(idEspecialidade);

    return result;
  }
}
