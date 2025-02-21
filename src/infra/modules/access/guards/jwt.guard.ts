import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './isPublic';
import { GetError } from '@/application/errors';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: Error | null, data: any, info: Error) {
    if (err || !data) {
      if (info?.message === 'No auth token') {
        throw new GetError({
          title: 'Token inválido!',
          message: 'Token não foi informado!',
          status: 401,
        });
      } else if (info?.message === 'jwt malformed') {
        throw new GetError({
          title: 'Token inválido!',
          message: 'Token não está no formato correto!',
          status: 401,
        });
      } else {
        throw new GetError({
          title: 'Acesso negado!',
          message: 'Você não possui permissões para realizar esta ação!',
          status: 401,
        });
      }
    }
    return data;
  }
}
