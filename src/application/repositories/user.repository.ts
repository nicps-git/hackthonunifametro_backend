import { Interface } from "readline";

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

export interface IMedicoRepository{
  nome: string;
  sobrenome: string;
  cnpj: string;
  crm: string;
  dataNascimento: string;
  sexo: string;
  telefone: string;
  email: string;
  user: string;
  password: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  }
}

export abstract class UserRepositories {
  abstract registerPaciente(paciente: IPacienteRepository): Promise<boolean>;
  
  abstract registerMedico(medico: IMedicoRepository): Promise<boolean>;

}
