import { AccessModule } from './access/access.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { DatabaseModules } from './database/database.module';
import { MailModule } from './mail/mail.module';

export const Modules = [
  ...DatabaseModules,
  AccessModule,
  CryptographyModule,
  MailModule,
];
