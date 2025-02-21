import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { EmailGateway } from '@/application/gateways/email.gatway';
import { MailRepositories } from './repositories/mail.repository';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [CryptographyModule],
  providers: [MailService, ...MailRepositories],
  exports: [EmailGateway],
})
export class MailModule {}
