import { z } from 'zod';
import { validateEmail, validateString } from './schemaValidateFileds';

export const registerPacienteSchema = z.object({
  nome: validateString,
  sobrenome: validateString,
  cpf: validateString.min(11, 'O CPF deve conter no mínimo 11 caracteres').max(11, 'O CPF deve conter no máximo 11 caracteres'),
  dataNascimento: validateString.min(5, 'Data deve conter no mínimo 5 caracteres').max(5, 'Data deve conter no máximo 5 caracteres'),
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

export const registerMedicoSchema = z.object({
  nome: validateString,
  sobrenome: validateString,
  cnpj: validateString.min(14,'CNPJ deve conter no mínimo 14 caracteres').max(14, 'CNPJ deve conter no máximo 14 caracteres'),
  dataNascimento: validateString.min(5, 'Data deve conter no mínimo 5 caracteres').max(5, 'Data deve conter no máximo 5 caracteres'),
  crm: validateString.min(6, 'O CRM deve conter no mínimo 6 caracteres').max(6, 'O CRM deve conter no máximo 6 caracteres'),
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
})

export type TRegisterMedicoSchema = z.infer<typeof registerMedicoSchema>