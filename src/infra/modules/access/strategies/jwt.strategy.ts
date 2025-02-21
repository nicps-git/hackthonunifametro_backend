import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TTokenSchema, tokenSchema } from '@/application/schemas/jwt.schema';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token: string | null = null;

          if (req.cookies?.['token']) {
            token = ExtractJwt.fromHeader('cookie')(req);
          } else if (req.headers.authorization) {
            token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
          }

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(
        process.env.JWT_PUBLIC_KEY ?? '',
        'base64',
      ).toString('utf-8'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: TTokenSchema) {
    return tokenSchema.parse(payload);
  }
}
