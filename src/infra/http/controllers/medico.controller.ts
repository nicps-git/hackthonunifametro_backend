import { GetMedicoByEspecialidadeDateUseCase } from '@/application/useCases/medico/getMedicoByEspecialidadeDate.usecase';
import { Public } from '@/infra/modules/access/guards/isPublic';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerGetDecorators } from '../decorators/swagger.decorator';
import { GetMedicoByEspecialidadeDateDTO } from '../dtos/medico/getMedicoByEspecialidadeDate.dto';
import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import {
  dateParamsSchema,
  idParamsSchema,
  TDateParamsSchema,
  TIdParamsSchema,
} from '@/application/schemas/default.schemas';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';

@ApiTags('Médico')
@Controller('medico')
export class MedicoController {
  constructor(
    private getMedicoByEspecialidadeDateUseCase: GetMedicoByEspecialidadeDateUseCase,
  ) {}

  @Get('byEspecialidadeDate')
  @Public()
  @SwaggerGetDecorators(GetMedicoByEspecialidadeDateDTO)
  @ApiQuery({ name: 'dataAgendamento', required: true, type: Date })
  async getMedicoByEspecialidadeDateUse(
    @Query('idEspecialidade', new ZodValidationPipe(idParamsSchema))
    idEspecialidade: TIdParamsSchema,
    @Query('dataAgendamento', new ZodValidationPipe(dateParamsSchema))
    dataAgendamento: TDateParamsSchema,
  ) {
    try {
      const result = await this.getMedicoByEspecialidadeDateUseCase.execute(
        idEspecialidade,
        dataAgendamento,
      );

      return customView(result);
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message:
          'Erro ao buscar médicos por especialidade e data do agendamento',
        error,
        status: 500,
      });
    }
  }
}
