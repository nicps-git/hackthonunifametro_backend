import { z } from 'zod';
import { validateString } from './schemaValidateFileds';

export const registerPacienteSchema = z.object({
  nome: validateString,
  sobrenome: validateString,
  cpf: validateString,
  dataNascimento: validateString,
  sexo: validateString,
  telefone: validateString,
  email: validateString,
  user: validateString,
  password: validateString,
});

export type TRegisterPacienteSchema = z.infer<typeof registerPacienteSchema>;
