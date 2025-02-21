export const schemaMessages = {
  requiredFiled: 'Campo obrigatório!',
  requiredTokenIdUserFiled: 'Identificador do usuário é obrigatório!',
  requiredIdFiled: 'Identificador é obrigatório!',
  invalidFormatEmail: 'Formato de email inválido!',
  invalidFormatId: 'Formato do identificador inválido!',
  invalidBooleanField: 'Campo deve ser um booleano!',
  invalidDateFormat: 'Formato de data inválida!',
  requiredArrayField: 'O campo deve ser um array!',
  noEmptyArray: 'O array não pode ser vazio!',
  invalidUrl: 'URL inválida!',
  requiredIdField: 'Cada chave deve ter um array de objetos!',
  invalidStringEnum: 'Valor enviado não é válido!',
  invalidNumberField: 'Campo deve ser um numero!',
};

import { z } from 'zod';

export const validateString = z
  .string({
    message: schemaMessages.requiredFiled,
  })
  .min(1, { message: schemaMessages.requiredFiled });

export const validateEmptyString = z.string({
  message: schemaMessages.requiredFiled,
});

export const validateArrayString = z
  .array(
    z
      .string({
        message: schemaMessages.requiredFiled,
      })
      .min(1, { message: schemaMessages.requiredFiled }),
    {
      message: schemaMessages.requiredArrayField,
    },
  )
  .nonempty(schemaMessages.noEmptyArray);

export const validateEmail = z
  .string({
    message: schemaMessages.requiredFiled,
  })
  .email(schemaMessages.invalidFormatEmail);

export const validateBoolean = z.boolean({
  message: schemaMessages.invalidBooleanField,
});

export const validateUuid = z
  .string({
    message: schemaMessages.requiredFiled,
  })
  .uuid(schemaMessages.invalidFormatId);

export const validateUuidToken = z
  .string({
    message: schemaMessages.requiredTokenIdUserFiled,
  })
  .min(1, schemaMessages.requiredTokenIdUserFiled)
  .uuid(schemaMessages.invalidFormatId);

export const validateUserPermissions = z.record(
  z.string().regex(/^\d+$/),
  z.array(z.number()),
);

export const validateNumber = z.number({
  message: schemaMessages.requiredFiled,
});

export const validateDate = z.coerce.date({
  message: schemaMessages.requiredFiled,
  invalid_type_error: schemaMessages.invalidDateFormat,
});

export const validateUuidsArray = z
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
  .nonempty(schemaMessages.noEmptyArray);

export const validateURL = z
  .string({
    message: schemaMessages.requiredFiled,
  })
  .url(schemaMessages.invalidUrl)
  .refine((url) => {
    try {
      const urlObject = new URL(url);

      return urlObject.hostname !== '';
    } catch (error) {
      return false;
    }
  }, schemaMessages.invalidUrl);

export const validateThemeColor = z
  .string({
    message: schemaMessages.requiredFiled,
  })
  .refine((val) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val), {
    message:
      'A cor deve estar no formato hexadecimal, por exemplo, #FFFFFF ou #FFF',
  })
  .refine((val) => val === val.toUpperCase(), {
    message: 'As letras devem estar em maiúsculas',
  });

export const validateCode = z
  .string({ message: schemaMessages.requiredFiled })
  .length(6, { message: 'Código deve conter 6 digitos!' })
  .regex(/^\d{6}$/, { message: 'Código informado é inválido!' });
