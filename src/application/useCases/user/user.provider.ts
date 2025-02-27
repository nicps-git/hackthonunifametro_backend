import { RegisterPacienteUseCase } from './registerPaciente.usecase';
import { RegisterMedicoUseCase } from './registerMedico.usecase';

export const userProvider = [RegisterPacienteUseCase, RegisterMedicoUseCase];
