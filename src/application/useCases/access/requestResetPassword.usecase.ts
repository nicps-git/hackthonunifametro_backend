import { GetError } from '@/application/errors';
import { EmailGateway } from '@/application/gateways/email.gatway';
import { AccessRepositories } from '@/application/repositories/access.repository';
import { TRequestResetPasswordSchema } from '@/application/schemas/access.schema';
import { generateSixDigitCode } from '@/application/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestResetPasswordUseCase {
  constructor(
    private accessRepository: AccessRepositories,
    private emailGateway: EmailGateway,
  ) {}

  async execute(request: TRequestResetPasswordSchema): Promise<boolean> {
    const result = await this.accessRepository.requestResetPassword(
      request.email,
    );

    if (result) {
      const code = generateSixDigitCode();

      const resultSaveCode = await this.accessRepository.saveCodeResetPassword(
        request.email,
        code,
      );

      if (resultSaveCode) {
        await this.emailGateway.sendTemplateMail({
          to: request.email,
          title: 'Solicitação para recuperação de senha!',
          template: 'resetPasswordCode',
          context: { code },
        });
      }

      return true;
    } else {
      throw new GetError({
        title: 'Solicitação realizada com sucesso!',
        message:
          'Caso o email informado esteja cadastrado, você receberá um email com as instruções para redefinir sua senha.',
      });
    }
  }
}
