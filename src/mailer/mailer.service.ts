import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import verifyAccount from './templates/render-content';
config();
import * as jwt from 'jsonwebtoken';
@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendVerifyEmail(userId: number, email: string, username: string) {
    const jwtVerify = await jwt.sign(
      { title: 'VERIFY ACCOUNT', userId, email, username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRY_VERIFY_ACCOUNT,
      },
    );

    const emailData = {
      emailSubject: '🐯🐯🐯 Welcome to Stony Store 🐯🐯🐯',
      emailTitle:
        'Vui lòng nhấn nút xác nhận bạn đã đăng ký tài khoản trên Stony Store',
      emailContent: 'This is the content of the email.',
      emailJwt: jwtVerify,
    };
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailData.emailSubject,
      // text: 'Welcome to our app! We hope you enjoy your experience.',
      html: verifyAccount(
        emailData.emailSubject,
        emailData.emailTitle,
        emailData.emailContent,
        emailData.emailJwt,
      ),
    };

    return this.transporter.sendMail(mailOptions);
  }
}
console.log();
