import { TCancelarAgendamentoSchema } from '@/application/schemas/agendamento.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CancelarAgendamentoDTO implements TCancelarAgendamentoSchema {
  @ApiProperty({ description: 'ID do agendamento', example: '1' })
  idAgendamento: string;

  @ApiProperty({
    description: 'Observação do cancelamento',
    example: 'Motivo do cancelamento',
  })
  observacao: string;
}
