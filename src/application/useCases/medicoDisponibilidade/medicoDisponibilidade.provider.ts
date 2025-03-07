import { ClearMedicoDisponibilidadeUseCase } from './clear.usecase';
import { CreateMedicoDisponibilidadeUseCase } from './create.usecase';
import { DeleteHourMedicoDisponibilidadeUseCase } from './deleteHour.usecase';
import { DeleteWeekDayMedicoDisponibilidadeUseCase } from './deleteWeekDay.usecase';
import { ListMedicoDisponibilidadeUseCase } from './list.usecase';

export const medicoDisponibilidadeProvider = [
  ClearMedicoDisponibilidadeUseCase,
  CreateMedicoDisponibilidadeUseCase,
  DeleteHourMedicoDisponibilidadeUseCase,
  DeleteWeekDayMedicoDisponibilidadeUseCase,
  ListMedicoDisponibilidadeUseCase,
];
