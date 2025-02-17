import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { Modules } from './infra/modules/list.module';
import { HttpModules } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModules,
    ...Modules,
  ],
})
export class AppModule {}
