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
import { accessSchema } from '@/application/schemas/access.schema';
import { LoginDTO } from '../dtos/access/login.dto';
import { Public } from '@/infra/modules/access/guards/isPublic';

@Controller('login')
export class AccessControllers {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post()
  @HttpCode(200)
  @Public()
  @UsePipes(new ZodValidationPipe(accessSchema))
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
}
