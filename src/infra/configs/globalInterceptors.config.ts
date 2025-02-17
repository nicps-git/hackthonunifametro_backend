import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '../http/filters/http-exception.filter';

export const setGlobalInterceptorsConfig = (app: INestApplication<any>) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
