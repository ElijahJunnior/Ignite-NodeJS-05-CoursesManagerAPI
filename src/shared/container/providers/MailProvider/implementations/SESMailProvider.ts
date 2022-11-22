import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_SES_REGION,
      }),
    });
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
    await this.client.sendMail({
      to,
      from: `Rentx <${process.env.AWS_SES_SENDER_ADDRESS}>`,
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
