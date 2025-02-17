import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './infra/configs/cors.config';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';
import { setGlobalInterceptorsConfig } from './infra/configs/globalInterceptors.config';
import { prefixGlobalRoutesV1Config } from './infra/configs/prefixGlobalRoutes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  corsConfig(app);

  const cofigService = app?.get<ConfigService<Env, true>>(ConfigService);
  const PORT = cofigService?.get('PORT', { infer: true });

  setGlobalInterceptorsConfig(app);
  prefixGlobalRoutesV1Config(app);

  await app?.listen(PORT);
}
bootstrap();
