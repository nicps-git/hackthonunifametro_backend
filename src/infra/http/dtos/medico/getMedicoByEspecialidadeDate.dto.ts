import { ApiProperty } from '@nestjs/swagger';

export class GetMedicoByEspecialidadeDateDTO {
  @ApiProperty({
    example: {
      id: 'ce511924-6652-4935-aa08-4e05eb036588',
      nome: 'John',
      sobrenome: 'Doe',
      crm: '123456',
      email: 'jhon.doe@tester.com',
      telefone: '12345678909',
      cnpj: '12345678909101',
      dataNascimento: '1998-01-01',
      especialidade: 'Clínica Médica',
      descricaoEspecialidade: 'Atendimento geral adulto',
      sexo: 'M',
      createdAt: new Date('2024-03-12'),
      updatedAt: new Date('2024-03-12'),
    },
  })
  data: {
    id: string;
    nome: string;
    sobrenome: string;
    crm: string;
    email: string;
    telefone: string;
    cnpj: string;
    dataNascimento: string;
    especialidade: string;
    descricaoEspecialidade: string;
    sexo: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
