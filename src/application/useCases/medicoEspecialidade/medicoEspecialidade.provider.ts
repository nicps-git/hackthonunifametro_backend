import { CreateMedicoEspecialidadeUseCase } from './create.usecase';
import { DeleteMedicoEspecialidadeUseCase } from './delete.usecase';
import { FindByIdMedicoEspecialidadeUseCase } from './findById.usecase';
import { ListMedicoEspecialidadeUseCase } from './list.usecase';
import { UpdateMedicoEspecialidadeUseCase } from './update.usecase';

export const medicoEspecialidadeProvider = [
  CreateMedicoEspecialidadeUseCase,
  DeleteMedicoEspecialidadeUseCase,
  FindByIdMedicoEspecialidadeUseCase,
  ListMedicoEspecialidadeUseCase,
  UpdateMedicoEspecialidadeUseCase,
];
