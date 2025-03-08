import { ApiProperty } from '@nestjs/swagger';

export class ListagemPacientesDTO {
  @ApiProperty({
    example: {
      id: 'ce511924-6652-4935-aa08-4e05eb036588',
      nome: 'John',
      sobrenome: 'Doe',
      cpf: '12345678909',
      dataNascimento: '1998-01-01',
      sexo: 'M',
      telefone: '12345678909',
      email: 'jhon@test.com',
      grauParentesco: 'Pai',
      nomeResponsavel: 'Maria',
      user: '12345678909',
      endereco: {
        id: 'ce511924-6652-4935-aa08-4e05eb036588',
        cep: '12345678',
        logradouro: 'Rua teste',
        numero: '123',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        createdAt: new Date('2024-03-12'),
        updatedAt: new Date('2024-03-12'),
      },
      perfil: 'Paciente',
      createdAt: new Date('2024-03-12'),
      updatedAt: new Date('2024-03-12'),
    },
  })
  data: {
    id: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    dataNascimento: string;
    sexo: string;
    telefone: string;
    email: string;
    grauParentesco?: string;
    nomeResponsavel?: string;
    user: string;
    endereco: {
      id: string;
      cep: string;
      logradouro: string;
      numero: string;
      complemento?: string;
      bairro: string;
      cidade: string;
      estado: string;
      createdAt: Date;
      updatedAt: Date;
    };
    perfil: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
