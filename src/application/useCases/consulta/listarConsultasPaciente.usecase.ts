import {
  ConsultaRepositories,
  TResultListConsultasPaciente,
} from '@/application/repositories/consulta.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarConsultasPacienteUseCase {
  constructor(private consultaRepositories: ConsultaRepositories) {}

  async execute(idPaciente: string): Promise<TResultListConsultasPaciente[]> {
    const result =
      await this.consultaRepositories.listarConsultasPaciente(idPaciente);

    return result;
  }
}
