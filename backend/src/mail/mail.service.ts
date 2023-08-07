import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'smtp://sandbox.smtp.mailtrap.io', // replace with your smtp server
      port: 587, // replace with your smtp port
      secure: false, // true for 465, false for other ports
      auth: {
        user: '5d597057be7d1a', // replace with your email
        pass: '285ffca6c6d744', // replace with your email password
      },
    });
  }

  async sendMail (mailOptions: MailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}
