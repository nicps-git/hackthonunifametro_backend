import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerDecorators,
  SwaggerGetDecorators,
} from '../decorators/swagger.decorator';
import { Public } from '@/infra/modules/access/guards/isPublic';
import { RealizarAgendamentoUseCase } from '@/application/useCases/agendamento/realizarAgendamento.usecase';
import {
  cancelarAgendamentoSchema,
  realizarAgendamentoSchema,
} from '@/application/schemas/agendamento.schema';
import { RealizarAgendamentoDTO } from '../dtos/agendamento/realizarAgendamento.dto';
import { CancelarAgendamentoUseCase } from '@/application/useCases/agendamento/cancelarAgendamento.usecase';
import { CancelarAgendamentoDTO } from '../dtos/agendamento/cancelarAgendamento.dto';
import { ListarAgendamentosPacienteDTO } from '../dtos/agendamento/listarAgendamentosPaciente.dto';
import {
  idParamsSchema,
  TIdParamsSchema,
} from '@/application/schemas/default.schemas';
import { ListarAgendamentosPacienteUseCase } from '@/application/useCases/agendamento/listarAgendamentosPaciente.usecase';
import { ListarAgendamentosMedicoDTO } from '../dtos/agendamento/listarAgendamentosMedico.dto';
import { ListarAgendamentosMedicoUseCase } from '@/application/useCases/agendamento/listarAgendamentosMedico.usecase';

@ApiTags('Agendamento')
@Controller('agendamento')
export class AgendamentoController {
  constructor(
    private realizarAgendamentoUseCase: RealizarAgendamentoUseCase,
    private cancelarAgendamentoUseCase: CancelarAgendamentoUseCase,
    private listarAgendamentosPacienteUseCase: ListarAgendamentosPacienteUseCase,
    private listarAgendamentosMedicoUseCase: ListarAgendamentosMedicoUseCase,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(realizarAgendamentoSchema))
  @SwaggerDecorators(RealizarAgendamentoDTO)
  async realizarAgendamento(@Body() body: RealizarAgendamentoDTO) {
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

  @Post('cancelar')
  @Public()
  @UsePipes(new ZodValidationPipe(cancelarAgendamentoSchema))
  @SwaggerDecorators(CancelarAgendamentoDTO)
  async cancelarAgendamento(@Body() body: CancelarAgendamentoDTO) {
    try {
      const result = await this.cancelarAgendamentoUseCase.execute(
        body.idAgendamento,
        body.observacao,
      );

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

  @Get('paciente')
  @Public()
  @SwaggerGetDecorators(ListarAgendamentosPacienteDTO)
  async listarAgendamentosPaciente(
    @Query('idPaciente', new ZodValidationPipe(idParamsSchema))
    idPaciente: TIdParamsSchema,
  ) {
    try {
      const result =
        await this.listarAgendamentosPacienteUseCase.execute(idPaciente);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar os agendamentos do paciente!',
        error,
        status: 500,
      });
    }
  }

  @Get('medico')
  @Public()
  @SwaggerGetDecorators(ListarAgendamentosMedicoDTO)
  async listarAgendamentosMedico(
    @Query('idMedico', new ZodValidationPipe(idParamsSchema))
    idMedico: TIdParamsSchema,
  ) {
    try {
      const result =
        await this.listarAgendamentosMedicoUseCase.execute(idMedico);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar os agendamentos do médico!',
        error,
        status: 500,
      });
    }
  }
}
