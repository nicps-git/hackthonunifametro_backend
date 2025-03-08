import { ConsultaRepositories } from '@/application/repositories/consulta.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IniciarConsultaUseCase {
  constructor(private consultaRepositories: ConsultaRepositories) {}

  async execute(idAgendamento: string): Promise<boolean> {
    const result =
      await this.consultaRepositories.iniciarConsulta(idAgendamento);

    return result;
  }
}
