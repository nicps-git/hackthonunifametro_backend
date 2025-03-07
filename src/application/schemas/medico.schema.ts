import { z } from 'zod';
import { validateUuid } from './schemaValidateFileds';

export const getMedicoByEspecialidadeDateSchema = z.object({
  idEspecialidade: validateUuid,
  data: z.date({
    message: 'Data inválida',
  }),
});

export type TGetMedicoByEspecialidadeDateSchema = z.infer<
  typeof getMedicoByEspecialidadeDateSchema
>;
