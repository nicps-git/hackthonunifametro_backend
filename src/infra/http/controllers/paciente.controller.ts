import { Public } from '@/infra/modules/access/guards/isPublic';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerGetDecorators } from '../decorators/swagger.decorator';
import { customView } from '../responseView/default.view';
import { GetError } from '@/application/errors';
import { ListagemPacientesUseCase } from '@/application/useCases/paciente/listagemPacientes.usecase';
import { ListagemPacientesDTO } from '../dtos/paciente/listagemPacientes.dto';

@ApiTags('Paciente')
@Controller('paciente')
export class PacienteController {
  constructor(private listagemPacientesUseCase: ListagemPacientesUseCase) {}

  @Get('all')
  @Public()
  @SwaggerGetDecorators(ListagemPacientesDTO)
  async listagemPacientes() {
    try {
      const result = await this.listagemPacientesUseCase.execute();

      return customView(result);
    } catch (error) {
      console.error(error);

      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao buscar todos os pacientes cadastrados no sistema',
        error,
        status: 500,
      });
    }
  }
}
