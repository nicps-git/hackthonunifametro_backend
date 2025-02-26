import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { customView } from '../responseView/default.view';
import { ZodValidationPipe } from '@/infra/pipes/zodValidation.pipe';
import { GetError } from '@/application/errors';
import { Response } from 'express';
import { LoginUseCase } from '@/application/useCases/access/login.usecase';
import {
  accessSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from '@/application/schemas/access.schema';
import { LoginDTO, LoginSuccessResponseDTO } from '../dtos/access/login.dto';
import { Public } from '@/infra/modules/access/guards/isPublic';
import { RequestResetPasswordDTO } from '../dtos/access/requestResetPassword.dto';
import { RequestResetPasswordUseCase } from '@/application/useCases/access/requestResetPassword.usecase';
import { ResetPasswordDTO } from '../dtos/access/resetPassword.dto';
import { ResetPasswordUseCase } from '@/application/useCases/access/resetPassword.usecase';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDecorators } from '../decorators/swagger.decorator';

@ApiTags('Login')
@Controller('login')
export class AccessControllers {
  constructor(
    private loginUseCase: LoginUseCase,
    private requestResetPasswordUseCase: RequestResetPasswordUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @Public()
  @UsePipes(new ZodValidationPipe(accessSchema))
  @SwaggerDecorators(LoginDTO, LoginSuccessResponseDTO, true)
  async login(@Body() body: LoginDTO, @Res() res: Response) {
    try {
      const result = await this.loginUseCase.execute(body, res);

      return res.json(customView(result));
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a autenticação do usuário!',
        error,
        status: 500,
      });
    }
  }

  @Post('requestResetPassword')
  @Public()
  @UsePipes(new ZodValidationPipe(requestResetPasswordSchema))
  @SwaggerDecorators(RequestResetPasswordDTO, undefined, true)
  async requestResetPassword(
    @Body() body: RequestResetPasswordDTO,
    @Res() res: Response,
  ) {
    try {
      const result = await this.requestResetPasswordUseCase.execute(body);

      return res.json(customView(result));
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a solicitação de recuperação de senha!',
        error,
        status: 500,
      });
    }
  }

  @Post('resetPassword')
  @Public()
  @UsePipes(new ZodValidationPipe(resetPasswordSchema))
  @SwaggerDecorators(ResetPasswordDTO, undefined, true)
  async resetPassword(@Body() body: ResetPasswordDTO, @Res() res: Response) {
    try {
      const result = await this.resetPasswordUseCase.execute(body);

      return res.json(customView(result));
    } catch (error) {
      throw new GetError({
        title: 'ERRO INTERNO',
        message: 'Erro ao realizar a recuperação de senha!',
        error,
        status: 500,
      });
    }
  }
}
