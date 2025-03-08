import {
  IPacientesResult,
  PacienteRepositories,
} from '@/application/repositories/paciente.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListagemPacientesUseCase {
  constructor(private pacienteRepositories: PacienteRepositories) {}

  async execute(): Promise<IPacientesResult[]> {
    const result = await this.pacienteRepositories.listagemPacientes();

    return result;
  }
}
