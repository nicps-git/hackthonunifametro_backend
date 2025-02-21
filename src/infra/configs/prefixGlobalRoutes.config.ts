import { INestApplication } from '@nestjs/common';

export const prefixGlobalRoutesV1Config = (app: INestApplication<any>) => {
  app.setGlobalPrefix('v1');
};
