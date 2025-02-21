import { GetError } from '@/application/errors';
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const parse = this.schema.parse(value);

      if (typeof parse !== 'object') {
        return parse;
      }
    } catch (error) {
      const errors: ZodError = error as any;

      if (error instanceof ZodError) {
        throw new BadRequestException(fromZodError(error));
      }

      if (errors.errors) {
        throw new BadRequestException(fromZodError(errors));
      }

      throw new GetError({
        title: 'Ação negada',
        message: 'Validação falhou!',
      });
    }

    return value;
  }
}
