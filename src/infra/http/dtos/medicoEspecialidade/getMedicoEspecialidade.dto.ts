import { ApiProperty } from '@nestjs/swagger';

export class ListMedicoEspecialidadeDTO {
  @ApiProperty({
    example: [
      {
        id: '123456',
        nome: 'Cardiologia',
        descrição: 'Especialidade que cuida do coração',
        createdAt: new Date('2024-03-12'),
        updatedAt: new Date('2024-03-12'),
      },
    ],
  })
  data: Array<{
    id: string;
    nome: string;
    descrição: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export class FindByIdMedicoEspecialidadeDTO {
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
