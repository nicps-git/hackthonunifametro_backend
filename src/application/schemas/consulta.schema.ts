import { z } from 'zod';
import {
  schemaMessages,
  validateString,
  validateUuid,
} from './schemaValidateFileds';

export const realizarConsultaSchema = z.object({
  idAgendamento: validateUuid,
  laudoMedico: validateString,
  prescricaoMedica: validateString,
  afastamento: z
    .string({
      required_error: schemaMessages.requiredFiled,
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Data deve estar no formato YYYY-MM-DD',
    })
    .transform((str) => new Date(str))
    .optional()
    .nullable(),
  retorno: z
    .string({
      required_error: schemaMessages.requiredFiled,
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Data deve estar no formato YYYY-MM-DD',
    })
    .transform((str) => new Date(str))
    .optional()
    .nullable(),
});

export type TRealizarConsultaSchema = z.infer<typeof realizarConsultaSchema>;
