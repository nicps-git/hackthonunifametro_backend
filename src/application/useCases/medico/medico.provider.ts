import { GetDisponibilidadeMedicoByDataAgendamentoUseCase } from './getDisponibilidadeMedicoByDataAgendamento.usecase';
import { GetMedicoByEspecialidadeUseCase } from './getMedicoByEspecialidade.usecase';
import { GetMedicoByEspecialidadeDateUseCase } from './getMedicoByEspecialidadeDate.usecase';
import { ListagemMedicosUseCase } from './listagemMedicos.usecase';

export const medicoProvider = [
  GetMedicoByEspecialidadeDateUseCase,
  GetMedicoByEspecialidadeUseCase,
  GetDisponibilidadeMedicoByDataAgendamentoUseCase,
  ListagemMedicosUseCase,
];
