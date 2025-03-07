import { GetDisponibilidadeMedicoByDataAgendamentoUseCase } from './getDisponibilidadeMedicoByDataAgendamento.usecase';
import { GetMedicoByEspecialidadeDateUseCase } from './getMedicoByEspecialidadeDate.usecase';

export const medicoProvider = [
  GetMedicoByEspecialidadeDateUseCase,
  GetDisponibilidadeMedicoByDataAgendamentoUseCase,
];
