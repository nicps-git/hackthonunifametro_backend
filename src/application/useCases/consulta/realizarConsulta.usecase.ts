import { ConsultaRepositories } from '@/application/repositories/consulta.repository';
import { TRealizarConsultaSchema } from '@/application/schemas/consulta.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RealizarConsultaUseCase {
  constructor(private consultaRepositories: ConsultaRepositories) {}

  async execute(request: TRealizarConsultaSchema): Promise<boolean> {
    const result = await this.consultaRepositories.realizarConsulta(request);

    return result;
  }
}
