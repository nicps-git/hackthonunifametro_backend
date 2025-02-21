import { GetError } from '@/application/errors';
import { EmailGateway } from '@/application/gateways/email.gatway';
import { HasherGateway } from '@/application/gateways/hasher.gatway';
import { AccessRepositories } from '@/application/repositories/access.repository';
import { TResetPasswordSchema } from '@/application/schemas/access.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private accessRepository: AccessRepositories,
    private hasherGateway: HasherGateway,
    private emailGateway: EmailGateway,
  ) {}

  async execute(request: TResetPasswordSchema): Promise<boolean> {
    const passwordHash = await this.hasherGateway.hash(request.password);

    const result = await this.accessRepository.resetPassword(
      passwordHash,
      request.code,
    );

    if (result.success) {
      await this.emailGateway.sendFreeMail({
        to: result.email,
        title: 'Recuperação de senha!',
        html: `<h1>Sua senha foi alterada com sucesso!</h1>`,
      });

      await this.accessRepository.disableCodeResetPassword(request.code);

      return true;
    } else {
      throw new GetError({
        title: 'Recuperação de senha falhou!',
        message: 'Código inválido ou expirado!',
      });
    }
  }
}
