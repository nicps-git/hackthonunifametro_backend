import { IRepositories } from '@/application/interfaces/repository.interface';
import { SendMailRepository } from './sendMail.repository';
import { EmailGateway } from '@/application/gateways/email.gatway';

export const MailRepositories: IRepositories[] = [
  {
    provide: EmailGateway,
    useClass: SendMailRepository,
  },
];
