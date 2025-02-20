import { z } from 'zod';
import { validateEmail, validateString } from './schemaValidateFileds';

export const registerPacienteSchema = z.object({
  nome: validateString,
  sobrenome: validateString,
  cpf: validateString,
  dataNascimento: validateString,
  sexo: validateString,
  telefone: validateString,
  email: validateEmail,
  user: validateString.optional(),
  password: validateString,
  endereco: z.object({
    cep: validateString.max(8, 'CEP deve conter no máximo 8 caracteres'),
    logradouro: validateString,
    numero: validateString.max(
      10,
      'Número deve conter no máximo 10 caracteres',
    ),
    complemento: validateString.optional(),
    bairro: validateString,
    cidade: validateString,
    estado: validateString.max(2, 'Estado deve conter no máximo 2 caracteres'),
  }),
});

export type TRegisterPacienteSchema = z.infer<typeof registerPacienteSchema>;
