import {
  EmailGateway,
  ISendFreeMailProps,
  ISendTemplateMail,
} from '@/application/gateways/email.gatway';
import { Injectable } from '@nestjs/common';
import { MailService } from '../mail.service';

@Injectable()
export class SendMailRepository implements EmailGateway {
  constructor(private mailService: MailService) {}

  async configureEmailSystem(): Promise<boolean> {
    try {
      await this.mailService.configureEmailSystem();

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendFreeMail(dataMail: ISendFreeMailProps): Promise<boolean> {
    try {
      await this.mailService.sendFreeMail(dataMail);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendTemplateMail(dataMail: ISendTemplateMail): Promise<boolean> {
    try {
      await this.mailService.sendTemplateMail(dataMail);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
