import { ApiProperty } from '@nestjs/swagger';

export interface IGetError {
  title: string;
  message: string;
  status?: number;
  validation?: any;
  error?: any;
}

export class GetError extends Error {
  error: IGetError;

  constructor(error: IGetError) {
    super(error.message);

    this.error = {
      title: error.title,
      message: error.message,
      status: error.status ?? 400,
      validation: error.validation ?? null,
      error: error.error ?? null,
    };

    Error.captureStackTrace(this, this.constructor);
  }
}

export class DefaultErrorResponseDTO {
  @ApiProperty({
    example: {
      title: 'Title error',
      message: 'Message error',
      status: 400,
      validation: null,
      error: null,
    },
  })
  error: IGetError;
}

export class DefaultErrorValidationResponseDTO {
  @ApiProperty({
    example: {
      title: 'Validation exception',
      message: 'Fields entered must be validated',
      status: 400,
      validation: [
        {
          path: 'Validate field',
          message: 'Validate message to field',
        },
      ],
      error: null,
    },
  })
  error: IGetError;
}

export class DefaultInteranlErrorResponseDTO {
  @ApiProperty({
    example: {
      title: 'Title error',
      message: 'Message error',
      status: 500,
      validation: null,
      error: {},
    },
  })
  error: IGetError;
}

export class SuccessResponseDTO {
  @ApiProperty({
    example: true,
  })
  data: boolean;
}
