import { GetError } from '@/application/errors';
import {
  ICompleteMedicoResult,
  IMedicoResult,
  MedicoRepositories,
} from '@/application/repositories/medico.repository';
import { getWeekDay } from '@/application/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetMedicoByEspecialidadeDateUseCase {
  constructor(private medicoRepositories: MedicoRepositories) {}

  async execute(
    idEspecialidade: string,
    dataAgendamento: Date,
  ): Promise<ICompleteMedicoResult[]> {
    const agendamentoDate = new Date(dataAgendamento);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setHours(today.getHours() - 3);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setHours(0, 0, 0, 0);
    maxDate.setHours(maxDate.getHours() - 3);

    if (agendamentoDate < today || agendamentoDate > maxDate) {
      throw new GetError({
        title: 'Ação negada',
        message:
          'Data de agendamento não pode ser menor que a data atual e não pode ser maior que 2 meses',
      });
    }

    const weekDay = getWeekDay(agendamentoDate);

    const resultDoctor =
      await this.medicoRepositories.getMedicoByEspecialidadeDate(
        idEspecialidade,
        weekDay,
      );

    const result: ICompleteMedicoResult[] = [];

    for (const doctor of resultDoctor) {
      const dataDisponibilidade =
        await this.medicoRepositories.getDisponibilidadeMedicoByDataAgendamento(
          doctor.id,
          agendamentoDate,
        );

      result.push({
        ...doctor,
        disponibilidade: dataDisponibilidade,
      });
    }

    return result;
  }
}
