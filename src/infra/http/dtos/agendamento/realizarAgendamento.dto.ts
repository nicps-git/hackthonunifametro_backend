import { TRealizarAgendamentoSchema } from '@/application/schemas/agendamento.schema';
import { ApiProperty } from '@nestjs/swagger';

export class RealizarAgendamentoDTO implements TRealizarAgendamentoSchema {
  @ApiProperty({ description: 'ID do paciente', example: '1' })
  idPaciente: string;

  @ApiProperty({ description: 'ID do médico', example: '1' })
  idMedico: string;

  @ApiProperty({ description: 'Data do agendamento', example: '2021-01-01' })
  data: Date;

  @ApiProperty({
    description: 'Horário de atendimento',
    example: '08:00',
    pattern: '^([01]\\d|2[0-3]):00$',
  })
  horario: string;
}
