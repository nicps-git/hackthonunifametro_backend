import { TRealizarConsultaSchema } from '@/application/schemas/consulta.schema';
import { ApiProperty } from '@nestjs/swagger';

export class RealizarConsultaDTO implements TRealizarConsultaSchema {
  @ApiProperty({ description: 'ID do agendamento', example: '1' })
  idAgendamento: string;

  @ApiProperty({
    description: 'Laudo médico do paciente',
    example: 'Laudo médico',
  })
  laudoMedico: string;

  @ApiProperty({
    description: 'Prescrição médica para o paciente',
    example: 'Prescrição médica',
  })
  prescricaoMedica: string;

  @ApiProperty({ description: 'Data do afastamento', example: '2021-01-01' })
  afastamento: Date;

  @ApiProperty({
    description: 'Data do próximo retorno',
    example: '2021-01-01',
  })
  retorno: Date;
}
