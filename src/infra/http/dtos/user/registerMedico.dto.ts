import { TRegisterMedicoSchema } from '@/application/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterMedicoDTO implements TRegisterMedicoSchema {
  @ApiProperty({ description: 'User frist name', example: 'John' })
  nome: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  sobrenome: string;

  @ApiProperty({ description: 'User CNPJ', example: '12345678909101' })
  cnpj: string;

  @ApiProperty({ description: 'User CRM', example: '123456' })
  crm: string;

  @ApiProperty({ description: 'User birth date', example: '1998-01-01' })
  dataNascimento: string;

  @ApiProperty({ description: 'User genre', example: 'M' })
  sexo: 'M' | 'F';

  @ApiProperty({ description: 'User phone', example: '12345678909' })
  telefone: string;

  @ApiProperty({ description: 'User email', example: 'jhon.doe@tester.com' })
  email: string;

  @ApiProperty({
    description: 'User medical specialty',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  idEspecialidade: string;

  @ApiProperty({ description: 'User password', example: 'tes@1234' })
  password: string;

  @ApiProperty({
    description: 'User address',
    example: {
      cep: '12345678',
      logradouro: 'Rua teste',
      numero: '123',
      complemento: 'Casa',
      bairro: 'Bairro teste',
      cidade: 'Cidade teste',
      estado: 'CE',
    },
  })
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}
