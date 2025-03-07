import { ApiProperty } from '@nestjs/swagger';

export class GetDisponibilidadeMedicoByDataAgendamentoDTO {
  @ApiProperty({
    example: [
      {
        id: '123456',
        idMedico: '123456',
        diaSemana: 'DOM',
        horario: '08:00',
        createdAt: new Date('2024-03-12'),
        updatedAt: new Date('2024-03-12'),
      },
    ],
  })
  data: Array<{
    id: string;
    idMedico: string;
    diaSemana: string;
    horario: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}
