import { ApiProperty } from '@nestjs/swagger';

export class GetMedicoByEspecialidadeDateDTO {
  @ApiProperty({
    example: {
      id: '123456',
      nome: 'Cardiologia',
      descrição: 'Especialidade que cuida do coração',
      createdAt: new Date('2024-03-12'),
      updatedAt: new Date('2024-03-12'),
    },
  })
  data: {
    id: string;
    nome: string;
    descrição: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
