import { CancelarAgendamentoUseCase } from './cancelarAgendamento.usecase';
import { ListarAgendamentosPacienteUseCase } from './listarAgendamentosPaciente.usecase';
import { RealizarAgendamentoUseCase } from './realizarAgendamento.usecase';

export const agendamentoProvider = [
  RealizarAgendamentoUseCase,
  CancelarAgendamentoUseCase,
  ListarAgendamentosPacienteUseCase,
];
