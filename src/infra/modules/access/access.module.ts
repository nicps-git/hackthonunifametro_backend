import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        privateKey: Buffer.from(
          process.env.JWT_PRIVATE_KEY ?? '',
          'base64',
        ).toString('utf-8'),
        publicKey: Buffer.from(
          process.env.JWT_PUBLIC_KEY ?? '',
          'base64',
        ).toString('utf-8'),
        signOptions: {
          expiresIn: '86400s',
          algorithm: 'RS256',
        },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AccessModule {}
