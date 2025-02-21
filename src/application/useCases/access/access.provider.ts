import { LoginUseCase } from './login.usecase';
import { RequestResetPasswordUseCase } from './requestResetPassword.usecase';
import { ResetPasswordUseCase } from './resetPassword.usecase';

export const accessProvider = [
  LoginUseCase,
  RequestResetPasswordUseCase,
  ResetPasswordUseCase,
];
