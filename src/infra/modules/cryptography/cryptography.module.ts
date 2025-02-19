import { EncrypterGateway } from '@/application/gateways/encrypter.gatway';
import { Module } from '@nestjs/common';
import { JwtEncrypterRepository } from './jwt/repositories/JwtEncryper.repository';
import { HasherGateway } from '@/application/gateways/hasher.gatway';
import { BcryptHasherRepository } from './bcrypt/repositories/BcryptHasher.repository';

@Module({
  providers: [
    {
      provide: EncrypterGateway,
      useClass: JwtEncrypterRepository,
    },
    {
      provide: HasherGateway,
      useClass: BcryptHasherRepository,
    },
  ],
  exports: [EncrypterGateway, HasherGateway],
})
export class CryptographyModule {}
