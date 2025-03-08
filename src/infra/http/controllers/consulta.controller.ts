import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerDecorators,
  SwaggerDeleteDecorators,
  SwaggerGetDecorators,
} from '../decorators/swagger.decorator';
import { Public } from '@/infra/modules/access/guards/isPublic';
import { RealizarConsultaUseCase } from '@/application/useCases/consulta/realizarConsulta.usecase';
import { realizarConsultaSchema } from '@/application/schemas/consulta.schema';
import { RealizarConsultaDTO } from '../dtos/consulta/realizarConsulta.dto';
import {
  idParamsSchema,
  TIdParamsSchema,
} from '@/application/schemas/default.schemas';
import { IniciarConsultaUseCase } from '@/application/useCases/consulta/iniciarConsulta.usecase';
import { ListarConsultasPacienteDTO } from '../dtos/consulta/listarConsultasPaciente.dto';
import { ListarConsultasPacienteUseCase } from '@/application/useCases/consulta/listarConsultasPaciente.usecase';

@ApiTags('Consulta')
@Controller('consulta')
export class ConsultaController {
  constructor(
    private realizarConsultaUseCase: RealizarConsultaUseCase,
    private iniciarConsultaUseCase: IniciarConsultaUseCase,
    private listarConsultasPacienteUseCase: ListarConsultasPacienteUseCase,
  ) {}

  @Patch('iniciarConsulta')
  @Public()
  @SwaggerDeleteDecorators()
  async iniciarConsulta(
    @Query('idAgendamento', new ZodValidationPipe(idParamsSchema))
    idAgendamento: TIdParamsSchema,
  ) {
    try {
      const result = await this.iniciarConsultaUseCase.execute(idAgendamento);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao iniciar consulta do paciente!',
        error,
        status: 500,
      });
    }
  }

  @Post('realizarConsulta')
  @Public()
  @UsePipes(new ZodValidationPipe(realizarConsultaSchema))
  @SwaggerDecorators(RealizarConsultaDTO)
  async realizarConsulta(@Body() body: RealizarConsultaDTO) {
    try {
      const result = await this.realizarConsultaUseCase.execute(body);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar consulta do paciente!',
        error,
        status: 500,
      });
    }
  }

  @Get('paciente')
  @Public()
  @SwaggerGetDecorators(ListarConsultasPacienteDTO)
  async listarConsultasPaciente(
    @Query('idPaciente', new ZodValidationPipe(idParamsSchema))
    idPaciente: TIdParamsSchema,
  ) {
    try {
      const result =
        await this.listarConsultasPacienteUseCase.execute(idPaciente);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar as consultas do paciente!',
        error,
        status: 500,
      });
    }
  }
}
