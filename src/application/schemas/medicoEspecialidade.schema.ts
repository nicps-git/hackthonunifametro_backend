import { z } from 'zod';
import { validateString, validateUuid } from './schemaValidateFileds';

export const medicoEspecialidadeSchema = z.object({
  nome: validateString,
  descricao: validateString,
});

export type TMedicoEspecialidadeSchema = z.infer<
  typeof medicoEspecialidadeSchema
>;

export const updateMedicoEspecialidadeSchema = z.object({
  id: validateUuid,
  ...medicoEspecialidadeSchema.shape,
});

export type TUpdateMedicoEspecialidadeSchema = z.infer<
  typeof updateMedicoEspecialidadeSchema
>;
