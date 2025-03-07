import { TUpdateMedicoEspecialidadeSchema } from '@/application/schemas/medicoEspecialidade.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicoEspecialidadeDTO
  implements TUpdateMedicoEspecialidadeSchema
{
  @ApiProperty({ description: 'Id da Especialidade', example: '123456' })
  id: string;

  @ApiProperty({ description: 'Nome da especialidade', example: 'Cardiologia' })
  nome: string;

  @ApiProperty({
    description: 'Descrição da especialidade',
    example: 'Especialidade que cuida do coração',
  })
  descricao: string;
}
