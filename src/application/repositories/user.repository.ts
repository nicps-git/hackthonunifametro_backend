export interface IPacienteRepository {
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

export abstract class UserRepositories {
  abstract registerPaciente(paciente: IPacienteRepository): Promise<boolean>;
}
