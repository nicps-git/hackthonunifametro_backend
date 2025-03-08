import { IniciarConsultaUseCase } from './iniciarConsulta.usecase';
import { ListarConsultasPacienteUseCase } from './listarConsultasPaciente.usecase';
import { RealizarConsultaUseCase } from './realizarConsulta.usecase';

export const consultaProvider = [
  RealizarConsultaUseCase,
  IniciarConsultaUseCase,
  ListarConsultasPacienteUseCase,
];
