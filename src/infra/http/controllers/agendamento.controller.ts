import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDecorators } from '../decorators/swagger.decorator';
import { Public } from '@/infra/modules/access/guards/isPublic';
import { RealizarAgendamentoUseCase } from '@/application/useCases/agendamento/realizarAgendamento.usecase';
import { realizarAgendamentoSchema } from '@/application/schemas/agendamento.schema';
import { RealizarAgendamentoDTO } from '../dtos/agendamento/realizarAgendamento.dto';

@ApiTags('Agendamento')
@Controller('agendamento')
export class AgendamentoController {
  constructor(private realizarAgendamentoUseCase: RealizarAgendamentoUseCase) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(realizarAgendamentoSchema))
  @SwaggerDecorators(RealizarAgendamentoDTO)
  async createMedicoEspecialidade(@Body() body: RealizarAgendamentoDTO) {
    try {
      const result = await this.realizarAgendamentoUseCase.execute(body);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar agendamento do paciente!',
        error,
        status: 500,
      });
    }
  }
}
