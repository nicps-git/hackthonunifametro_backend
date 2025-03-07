import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerArrayDecorators,
  SwaggerDeleteDecorators,
  SwaggerGetDecorators,
} from '../decorators/swagger.decorator';
import {
  idParamsSchema,
  TIdParamsSchema,
} from '@/application/schemas/default.schemas';
import { Public } from '@/infra/modules/access/guards/isPublic';
import { CreateMedicoDisponibilidadeUseCase } from '@/application/useCases/medicoDisponibilidade/create.usecase';
import {
  medicoDisponibilidadeDiaSemanaSchema,
  medicoDisponibilidadeHorarioSchema,
  medicoDisponiblididadeArraySchema,
  medicoDisponiblididadeSchema,
  TMedicoDisponibilidadeDiaSemanaSchema,
  TMedicoDisponibilidadeHorarioSchema,
} from '@/application/schemas/medicoDisponibilidade.schema';
import { CreateMedicoDisponibilidadeDTO } from '../dtos/medicoDisponibilidade/createMedicoDisponibilidade.dto';
import { ClearMedicoDisponibilidadeUseCase } from '@/application/useCases/medicoDisponibilidade/clear.usecase';
import { DeleteWeekDayMedicoDisponibilidadeUseCase } from '@/application/useCases/medicoDisponibilidade/deleteWeekDay.usecase';
import { DeleteHourMedicoDisponibilidadeUseCase } from '@/application/useCases/medicoDisponibilidade/deleteHour.usecase';
import { ListMedicoDisponibilidadeDTO } from '../dtos/medicoDisponibilidade/getMedicoDisponibilidade.dto';
import { ListMedicoDisponibilidadeUseCase } from '@/application/useCases/medicoDisponibilidade/list.usecase';

@ApiTags('Disponibilidade')
@Controller('disponibilidade')
export class DisponibilidadeController {
  constructor(
    private createMedicoDisponibilidadeUseCase: CreateMedicoDisponibilidadeUseCase,
    private clearMedicoDisponibilidadeUseCase: ClearMedicoDisponibilidadeUseCase,
    private deleteHourMedicoDisponibilidadeUseCase: DeleteHourMedicoDisponibilidadeUseCase,
    private deleteWeekDayMedicoDisponibilidadeUseCase: DeleteWeekDayMedicoDisponibilidadeUseCase,
    private listMedicoDisponibilidadeUseCase: ListMedicoDisponibilidadeUseCase,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(medicoDisponiblididadeArraySchema))
  @SwaggerArrayDecorators(CreateMedicoDisponibilidadeDTO)
  async createMedicoDisponibilidade(
    @Body() body: CreateMedicoDisponibilidadeDTO[],
  ) {
    try {
      const result =
        await this.createMedicoDisponibilidadeUseCase.execute(body);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao cadastrar as disponibilidades do médico!',
        error,
        status: 500,
      });
    }
  }

  @Delete('clear')
  @Public()
  @SwaggerDeleteDecorators()
  async clearMedicoDisponibilidade(
    @Query('idMedico', new ZodValidationPipe(idParamsSchema))
    idMedico: TIdParamsSchema,
  ) {
    try {
      const result =
        await this.clearMedicoDisponibilidadeUseCase.execute(idMedico);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao deletar as disponibilidades do médico!',
        error,
        status: 500,
      });
    }
  }

  @Delete('hour')
  @Public()
  @SwaggerDeleteDecorators()
  async deleteHourMedicoDisponibilidade(
    @Query('idMedico', new ZodValidationPipe(idParamsSchema))
    idMedico: TIdParamsSchema,
    @Query(
      'diaSemana',
      new ZodValidationPipe(medicoDisponibilidadeDiaSemanaSchema),
    )
    diaSemana: TMedicoDisponibilidadeDiaSemanaSchema,
    @Query('hora', new ZodValidationPipe(medicoDisponibilidadeHorarioSchema))
    hora: TMedicoDisponibilidadeHorarioSchema,
  ) {
    try {
      const result = await this.deleteHourMedicoDisponibilidadeUseCase.execute(
        idMedico,
        diaSemana,
        hora,
      );

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao deletar a hora da disponibilidade do médico!',
        error,
        status: 500,
      });
    }
  }

  @Delete('weekDay')
  @Public()
  @SwaggerDeleteDecorators()
  async deleteWeekDayMedicoDisponibilidade(
    @Query('idMedico', new ZodValidationPipe(idParamsSchema))
    idMedico: TIdParamsSchema,
    @Query(
      'diaSemana',
      new ZodValidationPipe(medicoDisponibilidadeDiaSemanaSchema),
    )
    diaSemana: TMedicoDisponibilidadeDiaSemanaSchema,
  ) {
    try {
      const result =
        await this.deleteWeekDayMedicoDisponibilidadeUseCase.execute(
          idMedico,
          diaSemana,
        );

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message:
          'Erro ao deletar o dia da semana da disponibilidade do médico!',
        error,
        status: 500,
      });
    }
  }

  @Get('all')
  @Public()
  @SwaggerGetDecorators(ListMedicoDisponibilidadeDTO)
  async listMedicoDisponibilidade(
    @Query('idMedico', new ZodValidationPipe(idParamsSchema))
    idMedico: TIdParamsSchema,
  ) {
    try {
      const result =
        await this.listMedicoDisponibilidadeUseCase.execute(idMedico);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar as disponibilidades do médico!',
        error,
        status: 500,
      });
    }
  }
}
