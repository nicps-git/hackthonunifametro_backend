import { EncrypterGateway } from '@/application/gateways/encrypter.gatway';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtEncrypterRepository implements EncrypterGateway {
  constructor(private jwtService: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async encryptHermesToken(): Promise<string> {
    return this.jwtService.sign(
      {},
      {
        privateKey: Buffer.from(
          process.env.HERMES_PRIVATE_KEY ?? '',
          'base64',
        ).toString('utf-8'),
        expiresIn: '300s',
      },
    );
  }
}
