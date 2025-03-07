import {
  DefaultErrorResponseDTO,
  DefaultErrorValidationResponseDTO,
  DefaultInteranlErrorResponseDTO,
  SuccessResponseDTO,
} from '@/application/errors';
import {
  TApiBodyDTO,
  // TProperties,
  TSuccessTypeDTO,
} from '@/application/interfaces/swagger.interface';
// import { CombinedFilesInterceptor } from '@/infra/interceptor/combinedFiles.interceptor';
import {
  // UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  // ApiConsumes,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

export function SwaggerDecorators(
  ApiBodyDTO: TApiBodyDTO,
  successTypeDTO: TSuccessTypeDTO = SuccessResponseDTO,
  removeAuth?: boolean,
) {
  const decorators = [
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: DefaultErrorResponseDTO,
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity',
      type: DefaultErrorValidationResponseDTO,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: DefaultInteranlErrorResponseDTO,
    }),
    ApiResponse({
      status: 200,
      description: 'Successful request',
      type: successTypeDTO,
    }),
    ApiBody({ type: ApiBodyDTO }),
  ];

  if (!removeAuth) {
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}

export function SwaggerArrayDecorators(
  ApiBodyDTO: TApiBodyDTO,
  successTypeDTO: TSuccessTypeDTO = SuccessResponseDTO,
  removeAuth?: boolean,
) {
  const decorators = [
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: DefaultErrorResponseDTO,
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity',
      type: DefaultErrorValidationResponseDTO,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: DefaultInteranlErrorResponseDTO,
    }),
    ApiResponse({
      status: 200,
      description: 'Successful request',
      type: successTypeDTO,
    }),
    ApiBody({ type: ApiBodyDTO, isArray: true }),
  ];

  if (!removeAuth) {
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}

export function SwaggerGetDecorators(
  successTypeDTO: TSuccessTypeDTO = SuccessResponseDTO,
  removeAuth?: boolean,
  removePagination?: boolean,
) {
  const decorators = [
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: DefaultErrorResponseDTO,
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity',
      type: DefaultErrorValidationResponseDTO,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: DefaultInteranlErrorResponseDTO,
    }),
    ApiResponse({
      status: 200,
      description: 'Successful request',
      type: successTypeDTO,
    }),
  ];

  if (!removeAuth) {
    decorators.push(ApiBearerAuth());
  }

  if (!removePagination) {
    decorators.push(
      ApiQuery({
        name: 'page',
        required: false,
      }),
    );
    decorators.push(
      ApiQuery({
        name: 'perPage',
        required: false,
      }),
    );
    decorators.push(
      ApiQuery({
        name: 'orderBy',
        required: false,
      }),
    );
  }

  return applyDecorators(...decorators);
}

export function SwaggerDeleteDecorators(
  successTypeDTO: TSuccessTypeDTO = SuccessResponseDTO,
  removeAuth?: boolean,
) {
  const decorators = [
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: DefaultErrorResponseDTO,
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity',
      type: DefaultErrorValidationResponseDTO,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: DefaultInteranlErrorResponseDTO,
    }),
    ApiResponse({
      status: 200,
      description: 'Successful request',
      type: successTypeDTO,
    }),
  ];

  if (!removeAuth) {
    decorators.push(ApiBearerAuth());
  }

  return applyDecorators(...decorators);
}

// export function SwaggerFilesDecorators(
//   properties: TProperties,
//   description: string = 'Upload de arquivos',
//   required: boolean = true,
//   successTypeDTO: TSuccessTypeDTO = SuccessResponseDTO,
//   removeAuth?: boolean,
// ) {
//   const decorators = [
//     ApiResponse({
//       status: 400,
//       description: 'Bad Request',
//       type: DefaultErrorResponseDTO,
//     }),
//     ApiResponse({
//       status: 422,
//       description: 'Unprocessable Entity',
//       type: DefaultErrorValidationResponseDTO,
//     }),
//     ApiResponse({
//       status: 500,
//       description: 'Internal Server Error',
//       type: DefaultInteranlErrorResponseDTO,
//     }),
//     ApiResponse({
//       status: 200,
//       description: 'Successful request',
//       type: successTypeDTO,
//     }),
//     UseInterceptors(
//       new CombinedFilesInterceptor(
//         properties.map((property) => ({
//           name: property.prop,
//         })),
//       ),
//     ),
//     ApiConsumes('multipart/form-data'),
//     ApiBody({
//       description,
//       type: 'multipart/form-data',
//       required,
//       schema: {
//         type: 'object',
//         properties: properties.reduce((acc, item) => {
//           acc[item.prop] = {
//             type: item?.type ?? 'array',
//             required: item.required,
//             items: { type: item?.itemType ?? 'string', format: 'binary' },
//             description: item?.description ?? 'Multiplas imagens',
//           };
//           return acc;
//         }, {}),
//       },
//     }),
//   ];

//   if (!removeAuth) {
//     decorators.push(ApiBearerAuth());
//   }

//   return applyDecorators(...decorators);
// }
