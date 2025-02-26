import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './infra/configs/cors.config';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';
import { setGlobalInterceptorsConfig } from './infra/configs/globalInterceptors.config';
import { prefixGlobalRoutesV1Config } from './infra/configs/prefixGlobalRoutes.config';
import { cookieConfig } from './infra/configs/cookies.config';
import { Swagger } from './infra/swagger/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  corsConfig(app);

  const cofigService = app?.get<ConfigService<Env, true>>(ConfigService);
  const PORT = cofigService?.get('PORT', { infer: true });

  setGlobalInterceptorsConfig(app);
  prefixGlobalRoutesV1Config(app);
  Swagger(app);
  cookieConfig(app);

  await app?.listen(PORT);
}
bootstrap();
