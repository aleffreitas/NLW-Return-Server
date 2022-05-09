import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../mail.adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "af0c141c9f34e5",
    pass: "3a6ec91b174d60"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: sendMailData){    
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Alef Freitas <alef.freitas07@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}