import { CancelarAgendamentoUseCase } from './cancelarAgendamento.usecase';
import { ListarAgendamentosMedicoUseCase } from './listarAgendamentosMedico.usecase';
import { ListarAgendamentosPacienteUseCase } from './listarAgendamentosPaciente.usecase';
import { RealizarAgendamentoUseCase } from './realizarAgendamento.usecase';

export const agendamentoProvider = [
  RealizarAgendamentoUseCase,
  CancelarAgendamentoUseCase,
  ListarAgendamentosPacienteUseCase,
  ListarAgendamentosMedicoUseCase,
];
