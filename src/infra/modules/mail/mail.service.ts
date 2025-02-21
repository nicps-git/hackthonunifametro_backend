import {
  ISendFreeMailProps,
  ISendTemplateMail,
} from '@/application/gateways/email.gatway';
import { EncrypterGateway } from '@/application/gateways/encrypter.gatway';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly encrypterGateway: EncrypterGateway) {}

  async configureEmailSystem() {
    const hermesToken = await this.encrypterGateway.encryptHermesToken();

    const response = await fetch(
      `${process.env.HERMES_HOST}email/templateMail/config`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hermesToken}`,
        },
      },
    );

    const result: { data: boolean } = await response.json();

    return result.data;
  }

  async sendFreeMail(dataMail: ISendFreeMailProps) {
    const hermesToken = await this.encrypterGateway.encryptHermesToken();

    await fetch(`${process.env.HERMES_HOST}email/send/freeMail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hermesToken}`,
      },
      body: JSON.stringify({
        to: dataMail.to,
        title: dataMail.title,
        html: dataMail.html,
      }),
    });
  }

  async sendTemplateMail(dataMail: ISendTemplateMail) {
    const hermesToken = await this.encrypterGateway.encryptHermesToken();

    await fetch(`${process.env.HERMES_HOST}email/send/templateMail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hermesToken}`,
      },
      body: JSON.stringify({
        to: dataMail.to,
        title: dataMail.title,
        template: dataMail.template,
        context: dataMail.context,
      }),
    });
  }
}
