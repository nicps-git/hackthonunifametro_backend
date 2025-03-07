import { GetError } from '@/application/errors';
import {
  IMedicoResult,
  MedicoRepositories,
} from '@/application/repositories/medico.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetMedicoByEspecialidadeDateUseCase {
  constructor(private medicoRepositories: MedicoRepositories) {}

  protected getWeekDay(date: Date): string {
    const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  }

  async execute(
    idEspecialidade: string,
    dataAgendamento: Date,
  ): Promise<IMedicoResult[]> {
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

    const weekDay = this.getWeekDay(agendamentoDate);

    const result = await this.medicoRepositories.getMedicoByEspecialidadeDate(
      idEspecialidade,
      weekDay,
    );

    return result;
  }
}
