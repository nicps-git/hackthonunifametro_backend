export interface ISendFreeMailProps {
  to: string;
  title: string;
  html: string;
}

export interface ISendTemplateMail {
  to: string;
  title: string;
  template: string;
  context: object;
}

export abstract class EmailGateway {
  abstract configureEmailSystem(): Promise<boolean>;

  abstract sendFreeMail(dataMail: ISendFreeMailProps): Promise<boolean>;

  abstract sendTemplateMail(dataMail: ISendTemplateMail): Promise<boolean>;
}
