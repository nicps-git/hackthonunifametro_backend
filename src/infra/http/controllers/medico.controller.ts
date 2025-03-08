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
import { GetDisponibilidadeMedicoByDataAgendamentoDTO } from '../dtos/medico/getDisponibilidadeMedicoByDataAgendamento.dto';
import { GetDisponibilidadeMedicoByDataAgendamentoUseCase } from '@/application/useCases/medico/getDisponibilidadeMedicoByDataAgendamento.usecase';
import { GetMedicoByEspecialidadeDTO } from '../dtos/medico/getMedicoByEspecialidade.dto';
import { GetMedicoByEspecialidadeUseCase } from '@/application/useCases/medico/getMedicoByEspecialidade.usecase';
import { ListagemMedicosDTO } from '../dtos/medico/listagemMedicos.dto';
import { ListagemMedicosUseCase } from '@/application/useCases/medico/listagemMedicos.usecase';

@ApiTags('Médico')
@Controller('medico')
export class MedicoController {
  constructor(
    private getMedicoByEspecialidadeDateUseCase: GetMedicoByEspecialidadeDateUseCase,
    private getMedicoByEspecialidadeUseCase: GetMedicoByEspecialidadeUseCase,
    private getDisponibilidadeMedicoByDataAgendamentoUseCase: GetDisponibilidadeMedicoByDataAgendamentoUseCase,
    private listagemMedicosUseCase: ListagemMedicosUseCase,
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

  @Get('byEspecialidade')
  @Public()
  @SwaggerGetDecorators(GetMedicoByEspecialidadeDTO)
  async getMedicoByEspecialidadeUse(
    @Query('idEspecialidade', new ZodValidationPipe(idParamsSchema))
    idEspecialidade: TIdParamsSchema,
  ) {
    try {
      const result =
        await this.getMedicoByEspecialidadeUseCase.execute(idEspecialidade);

      return customView(result);
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao buscar médicos por especialidade',
        error,
        status: 500,
      });
    }
  }

  @Get('disponibilidadeByDataAgendamento')
  @Public()
  @SwaggerGetDecorators(GetDisponibilidadeMedicoByDataAgendamentoDTO)
  @ApiQuery({ name: 'dataAgendamento', required: true, type: Date })
  async getDisponibilidadeMedicoByDataAgendamento(
    @Query('idMedico', new ZodValidationPipe(idParamsSchema))
    idMedico: TIdParamsSchema,
    @Query('dataAgendamento', new ZodValidationPipe(dateParamsSchema))
    dataAgendamento: TDateParamsSchema,
  ) {
    try {
      const result =
        await this.getDisponibilidadeMedicoByDataAgendamentoUseCase.execute(
          idMedico,
          dataAgendamento,
        );

      return customView(result);
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message:
          'Erro ao buscar disponibilidade do médico por data do agendamento',
        error,
        status: 500,
      });
    }
  }

  @Get('all')
  @Public()
  @SwaggerGetDecorators(ListagemMedicosDTO)
  async listagemMedicos() {
    try {
      const result = await this.listagemMedicosUseCase.execute();

      return customView(result);
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao buscar todos os médicos cadastrados no sistema',
        error,
        status: 500,
      });
    }
  }
}
