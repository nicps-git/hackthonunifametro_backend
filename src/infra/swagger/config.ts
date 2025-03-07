import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const Swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API - Uni Clin')
    .setDescription('Documentation of the Uni Clin API routes')
    .setVersion('1.0')
    .addTag('Disponibilidade')
    .addTag('Especialidade')
    .addTag('Login')
    .addTag('Usuário')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description:
        'Authorization token for requests to the back end is obtained through user authentication!',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
  });
};
