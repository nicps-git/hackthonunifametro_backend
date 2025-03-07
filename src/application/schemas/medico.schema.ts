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

export const getMedicoByEspecialidadeSchema = z.object({
  idEspecialidade: validateUuid,
});

export type TGetMedicoByEspecialidadeSchema = z.infer<
  typeof getMedicoByEspecialidadeSchema
>;

export const getDisponibilidadeMedicoByDataAgendamentoSchema = z.object({
  idMedico: validateUuid,
  dataAgendamento: z.date({
    message: 'Data inválida',
  }),
});

export type TGetDisponibilidadeMedicoByDataAgendamentoSchema = z.infer<
  typeof getDisponibilidadeMedicoByDataAgendamentoSchema
>;
