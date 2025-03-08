import {
  IMedicoResult,
  MedicoRepositories,
} from '@/application/repositories/medico.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListagemMedicosUseCase {
  constructor(private medicoRepositories: MedicoRepositories) {}

  async execute(): Promise<IMedicoResult[]> {
    const result = await this.medicoRepositories.listagemMedicos();

    return result;
  }
}
