import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';

export const cookieConfig = (app: INestApplication<any>) => {
  app.use(cookieParser());
};
