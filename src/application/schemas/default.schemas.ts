import { z } from 'zod';
import { schemaMessages } from './schemaValidateFileds';

export const idParamsSchema = z
  .string({
    message: schemaMessages.requiredIdFiled,
  })
  .uuid(schemaMessages.invalidFormatId);

export type TIdParamsSchema = z.infer<typeof idParamsSchema>;

export const idObjectParamsSchema = z
  .string({
    message: schemaMessages.requiredIdFiled,
  })
  .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: schemaMessages.invalidFormatId,
  });

export type TIdObjectParamsSchema = z.infer<typeof idObjectParamsSchema>;

export const idArrayParamsSchema = z
  .array(
    z
      .string({
        message: schemaMessages.requiredFiled,
      })
      .uuid(schemaMessages.invalidFormatId),
    {
      message: schemaMessages.requiredArrayField,
    },
  )
  .nonempty(schemaMessages.noEmptyArray)
  .optional();

export type TIdArrayParamsSchema = z.infer<typeof idArrayParamsSchema>;

export const fileImageSchema = z.object({
  fieldname: z.string({ message: 'Erro aqui' }),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string().refine((type) => type.startsWith('image/'), {
    message: 'O arquivo deve ser uma imagem',
  }),
  size: z.number().max(2 * 1024 * 1024, 'O arquivo excedeu o limite de 2MB'),
  buffer: z.any(),
});

export const fileImageVideoSchema = z.object({
  fieldname: z.string({ message: 'Erro aqui' }),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z
    .string()
    .refine((type) => type.startsWith('image/') || type.startsWith('video/'), {
      message: 'O arquivo deve ser uma imagem',
    }),
  size: z.number().max(5 * 1024 * 1024, 'O arquivo excedeu o limite de 5MB'),
  buffer: z.any(),
});

export type TFileImageSchema = z.infer<typeof fileImageSchema>;

export const filesImagesSchema = z
  .record(
    z.array(fileImageSchema).nonempty({ message: schemaMessages.noEmptyArray }),
  )
  .refine((data) => Object.keys(data).length > 0, {
    message: schemaMessages.requiredIdField,
  });

export const filesImagesVideosSchema = z
  .record(
    z
      .array(fileImageVideoSchema)
      .nonempty({ message: schemaMessages.noEmptyArray }),
  )
  .refine((data) => Object.keys(data).length > 0, {
    message: schemaMessages.requiredIdField,
  });

export type TFilesImageSchema = z.infer<typeof filesImagesSchema>;
