import { TMedicoEspecialidadeSchema } from '@/application/schemas/medicoEspecialidade.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicoEspecialidadeDTO
  implements TMedicoEspecialidadeSchema
{
  @ApiProperty({ description: 'Nome da especialidade', example: 'Cardiologia' })
  nome: string;

  @ApiProperty({
    description: 'Descrição da especialidade',
    example: 'Especialidade que cuida do coração',
  })
  descricao: string;
}
