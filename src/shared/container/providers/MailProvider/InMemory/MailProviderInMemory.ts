import { IMailProvider } from "../IMailProvider";

interface IMessage {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

class MailProviderInMemory implements IMailProvider {
  private messages: IMessage[] = [];
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
