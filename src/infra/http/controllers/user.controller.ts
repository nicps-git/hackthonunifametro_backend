import { registerMedicoSchema, registerPacienteSchema } from '@/application/schemas/user.schema';
import { RegisterPacienteUseCase } from '@/application/useCases/user/registerPaciente.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { RegisterPacienteDTO } from '../dtos/user/registerPaciente.dto';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';
import { Public } from '@/infra/modules/access/guards/isPublic';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDecorators } from '../decorators/swagger.decorator';
import { RegisterMedicoUseCase } from '@/application/useCases/user/registerMedico.usecase';
import { RegisterMedicoDTO } from '../dtos/user/registerMedico.dto';

@ApiTags('Usuário')
@Controller('usuario')
export class UserController {
  constructor(private registerPacienteUseCase: RegisterPacienteUseCase, private registerMedicoUseCase: RegisterMedicoUseCase) {}

  @Post('paciente')
  @Public()
  @UsePipes(new ZodValidationPipe(registerPacienteSchema))
  @SwaggerDecorators(RegisterPacienteDTO, undefined, true)
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

  @Post('medico')
  @Public()
  @UsePipes(new ZodValidationPipe(registerMedicoSchema))
  @SwaggerDecorators(RegisterMedicoDTO, undefined, true)
  async registerMedico(@Body() body: RegisterMedicoDTO){
    try{

      const result = await this.registerMedicoUseCase.execute(body);

      return customView(result);
    } catch (error){
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao cadastrar usuário!',
        error,
        status: 500,
      })
    }
  }

}
