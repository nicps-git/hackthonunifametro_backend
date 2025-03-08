export interface IPacientesResult {
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
    complemento: string | null;
    bairro: string;
    cidade: string;
    estado: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  perfil: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class PacienteRepositories {
  abstract listagemPacientes(): Promise<IPacientesResult[]>;
}
