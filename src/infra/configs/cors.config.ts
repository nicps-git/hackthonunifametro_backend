import { INestApplication } from '@nestjs/common';

export const corsConfig = (app: INestApplication<any>) => {
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Headers',
    credentials: true,
  });
};
