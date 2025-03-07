import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
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
import { CreateMedicoEspecialidadeUseCase } from '@/application/useCases/medicoEspecialidade/create.usecase';
import { DeleteMedicoEspecialidadeUseCase } from '@/application/useCases/medicoEspecialidade/delete.usecase';
import { UpdateMedicoEspecialidadeUseCase } from '@/application/useCases/medicoEspecialidade/update.usecase';
import { ListMedicoEspecialidadeUseCase } from '@/application/useCases/medicoEspecialidade/list.usecase';
import { FindByIdMedicoEspecialidadeUseCase } from '@/application/useCases/medicoEspecialidade/findById.usecase';
import {
  medicoEspecialidadeSchema,
  updateMedicoEspecialidadeSchema,
} from '@/application/schemas/medicoEspecialidade.schema';
import { CreateMedicoEspecialidadeDTO } from '../dtos/medicoEspecialidade/createMedicoEspecialidade.dto';
import {
  idParamsSchema,
  TIdParamsSchema,
} from '@/application/schemas/default.schemas';
import { UpdateMedicoEspecialidadeDTO } from '../dtos/medicoEspecialidade/updateMedicoEspecialidade.dto';
import {
  FindByIdMedicoEspecialidadeDTO,
  ListMedicoEspecialidadeDTO,
} from '../dtos/medicoEspecialidade/getMedicoEspecialidade.dto';
import { Public } from '@/infra/modules/access/guards/isPublic';

@ApiTags('Especialidade')
@Controller('especialidade')
export class EspecialidadeController {
  constructor(
    private createMedicoEspecialidadeUseCase: CreateMedicoEspecialidadeUseCase,
    private deleteMedicoEspecialidadeUseCase: DeleteMedicoEspecialidadeUseCase,
    private updateMedicoEspecialidadeUseCase: UpdateMedicoEspecialidadeUseCase,
    private listMedicoEspecialidadeUseCase: ListMedicoEspecialidadeUseCase,
    private findByIdMedicoEspecialidadeUseCase: FindByIdMedicoEspecialidadeUseCase,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(medicoEspecialidadeSchema))
  @SwaggerDecorators(CreateMedicoEspecialidadeDTO)
  async createMedicoEspecialidade(@Body() body: CreateMedicoEspecialidadeDTO) {
    try {
      const result = await this.createMedicoEspecialidadeUseCase.execute(body);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao cadastrar especialidade do médico!',
        error,
        status: 500,
      });
    }
  }

  @Delete()
  @Public()
  @SwaggerDeleteDecorators()
  async deleteMedicoEspecialidade(
    @Query('id', new ZodValidationPipe(idParamsSchema)) id: TIdParamsSchema,
  ) {
    try {
      const result = await this.deleteMedicoEspecialidadeUseCase.execute(id);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao deletar especialidade do médico!',
        error,
        status: 500,
      });
    }
  }

  @Put()
  @Public()
  @UsePipes(new ZodValidationPipe(updateMedicoEspecialidadeSchema))
  @SwaggerDecorators(UpdateMedicoEspecialidadeDTO)
  async updateMedicoEspecialidade(@Body() body: UpdateMedicoEspecialidadeDTO) {
    try {
      const result = await this.updateMedicoEspecialidadeUseCase.execute(
        body.id,
        body,
      );

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao atualizar especialidade do médico!',
        error,
        status: 500,
      });
    }
  }

  @Get('all')
  @Public()
  @SwaggerGetDecorators(ListMedicoEspecialidadeDTO)
  async listMedicoEspecialidade() {
    try {
      const result = await this.listMedicoEspecialidadeUseCase.execute();

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao listar especialidades do médico!',
        error,
        status: 500,
      });
    }
  }

  @Get('byId')
  @Public()
  @SwaggerGetDecorators(FindByIdMedicoEspecialidadeDTO)
  async findByIdMedicoEspecialidade(
    @Query('id', new ZodValidationPipe(idParamsSchema)) id: TIdParamsSchema,
  ) {
    try {
      const result = await this.findByIdMedicoEspecialidadeUseCase.execute(id);

      return customView(result);
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao buscar especialidade do médico!',
        error,
        status: 500,
      });
    }
  }
}
