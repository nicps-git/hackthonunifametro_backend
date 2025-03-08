import { z } from 'zod';
import {
  schemaMessages,
  validateString,
  validateUuid,
} from './schemaValidateFileds';

export const realizarAgendamentoSchema = z.object({
  idPaciente: validateUuid,
  idMedico: validateUuid,
  data: z
    .string({
      required_error: schemaMessages.requiredFiled,
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Data deve estar no formato YYYY-MM-DD',
    })
    .transform((str) => new Date(str)),
  horario: validateString.regex(/^([01]\d|2[0-3]):00$/, {
    message: 'Horário deve estar no formato HH:00 e ser um horário válido',
  }),
});

export type TRealizarAgendamentoSchema = z.infer<
  typeof realizarAgendamentoSchema
>;

export const cancelarAgendamentoSchema = z.object({
  idAgendamento: validateUuid,
  observacao: validateString,
});

export type TCancelarAgendamentoSchema = z.infer<
  typeof cancelarAgendamentoSchema
>;
