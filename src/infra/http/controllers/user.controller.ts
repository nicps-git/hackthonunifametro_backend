import { registerPacienteSchema } from '@/application/schemas/user.schema';
import { RegisterPacienteUseCase } from '@/application/useCases/user/registerPaciente.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { RegisterPacienteDTO } from '../dtos/user/registerPaciente.dto';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';

@Controller('usuario')
export class UserController {
  constructor(private registerPacienteUseCase: RegisterPacienteUseCase) {}

  @Post('paciente')
  @UsePipes(new ZodValidationPipe(registerPacienteSchema))
  async registerPaciente(@Body() body: RegisterPacienteDTO) {
    try {
      const result = await this.registerPacienteUseCase.execute(body);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao cadastrar usuário!',
        error,
        status: 500,
      });
    }
  }
}
