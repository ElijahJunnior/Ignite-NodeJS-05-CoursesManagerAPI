import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    // função que cria o cliente do nodemailer responsável pelo envio dos emails
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) =>
        console.error(
          "*** Error in Function nodemailer.createTestAccount *** ",
          err
        )
      );
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    // efetua a leitura do arquivo de template e grava em uma variável string
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    // cria uma função, usando o handlebars, para compilar o email
    const templateParse = handlebars.compile(templateFileContent);

    // compila o template substituindo as chaves pelas variáveis
    const templateHTML = templateParse(variables);

    // função que uso o cliente do nodemailer para enviar o email
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageID);
    console.log("Message URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
