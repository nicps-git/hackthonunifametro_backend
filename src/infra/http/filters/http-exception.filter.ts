import { IGetError } from '@/application/errors';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

interface IException {
  response: {
    error: IGetError;
    name: string;
    details: Array<{ path: string; message: string }>;
  };
  error: {
    title: string;
    message: string;
    status: number;
    validation: any;
    error: {
      error: {
        title: string;
        message: string;
        status: number;
        validation: any;
        error: {
          error: {
            title: string;
            message: string;
            status: number;
            validation: any;
            error: any;
          };
        };
      };
    };
  };
}

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: IException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let error: any;

    if (exception.response?.name === 'ZodValidationError') {
      error = {
        title: 'Validation exception',
        message: 'Fields entered must be validated',
        status: 422,
        validation: exception.response.details.map((detail) => ({
          path: detail.path[detail.path.length - 1],
          message: detail.message,
        })),
        error: null,
      };
    } else if (exception?.error?.error?.error?.error?.error) {
      error = exception?.error?.error?.error?.error?.error;
    } else if (exception?.error?.error?.error) {
      error = exception?.error?.error?.error;
    } else if (exception?.error) {
      error = exception?.error;
    } else {
      error = exception;
    }

    response.status(error.status).json({ error: error });
  }
}
