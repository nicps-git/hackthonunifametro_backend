import { z } from 'zod';
import { validateString, validateUuid } from './schemaValidateFileds';

export const medicoDisponibilidadeDiaSemanaSchema = z.enum(
  ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
  {
    message: 'Dia da semana deve ser DOM, SEG, TER, QUA, QUI, SEX, SAB',
  },
);

export type TMedicoDisponibilidadeDiaSemanaSchema = z.infer<
  typeof medicoDisponibilidadeDiaSemanaSchema
>;

export const medicoDisponibilidadeHorarioSchema = validateString.regex(
  /^([01]\d|2[0-3]):00$/,
  {
    message: 'Horário deve estar no formato HH:00 e ser um horário válido',
  },
);

export type TMedicoDisponibilidadeHorarioSchema = z.infer<
  typeof medicoDisponibilidadeHorarioSchema
>;

export const medicoDisponiblididadeSchema = z.object({
  idMedico: validateUuid,
  diaSemana: medicoDisponibilidadeDiaSemanaSchema,
  horario: medicoDisponibilidadeHorarioSchema,
});

export const medicoDisponiblididadeArraySchema = z.array(
  medicoDisponiblididadeSchema,
);

export type TMedicoDisponibilidadeSchema = z.infer<
  typeof medicoDisponiblididadeSchema
>;

export const updateMedicoDisponiblilidadeSchema = z.object({
  id: validateUuid,
  ...medicoDisponiblididadeSchema.shape,
});

export type TUpdateMedicoDisponibilidadeSchema = z.infer<
  typeof updateMedicoDisponiblilidadeSchema
>;
