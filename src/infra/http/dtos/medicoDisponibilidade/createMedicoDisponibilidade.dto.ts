import { TMedicoDisponibilidadeSchema } from '@/application/schemas/medicoDisponibilidade.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicoDisponibilidadeDTO
  implements TMedicoDisponibilidadeSchema
{
  @ApiProperty({ description: 'ID do médico', example: '1' })
  idMedico: string;

  @ApiProperty({
    description: 'Dia da semana de atendimento',
    example: 'DOM',
    enum: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
  })
  diaSemana: 'DOM' | 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB';

  @ApiProperty({
    description: 'Horário de atendimento',
    example: '08:00',
    pattern: '^([01]\\d|2[0-3]):00$',
  })
  horario: string;
}
