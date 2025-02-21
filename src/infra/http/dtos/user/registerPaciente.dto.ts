import { TRegisterPacienteSchema } from '@/application/schemas/user.schema';

export class RegisterPacienteDTO implements TRegisterPacienteSchema {
  nome: string;
  sobrenome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  telefone: string;
  email: string;
  password: string;
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
