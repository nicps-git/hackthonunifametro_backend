import { TRegisterPacienteSchema } from '@/application/schemas/user.schema';

export class RegisterPacienteDTO implements TRegisterPacienteSchema {
  nome: string;
  sobrenome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  telefone: string;
  email: string;
  user: string;
  password: string;
}
