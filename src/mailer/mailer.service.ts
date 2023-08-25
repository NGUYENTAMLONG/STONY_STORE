import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import {
  verifyAccountAgain,
  verifyAccount,
  resultVerifyAccountAgain,
  forgotPasswordForm,
} from './templates/render-content';
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
  async reSendVerifyEmail(
    userId: number,
    email: string,
    username: string,
    resetedPassword: string,
  ) {
    const jwtVerifyAgain = await jwt.sign(
      {
        title: 'VERIFY ACCOUNT AGAIN',
        userId,
        email,
        username,
        resetedPassword,
        verifyAgain: true,
      },
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
      emailJwt: jwtVerifyAgain,
    };
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailData.emailSubject,
      // text: 'Welcome to our app! We hope you enjoy your experience.',
      html: verifyAccountAgain(
        emailData.emailSubject,
        emailData.emailTitle,
        emailData.emailContent,
        emailData.emailJwt,
      ),
    };

    return this.transporter.sendMail(mailOptions);
  }
  async sendResultVerifyAgain(
    userId: number,
    email: string,
    username: string,
    resetedPassword: string,
  ) {
    const emailData = {
      emailSubject: '🐯🐯🐯 Welcome to Stony Store 🐯🐯🐯',
      emailTitle: 'Tài khoản của bạn đã được kích hoạt',
      emailPayload: {
        username,
        resetedPassword,
      },
    };
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailData.emailSubject,
      // text: 'Welcome to our app! We hope you enjoy your experience.',
      html: resultVerifyAccountAgain(
        emailData.emailSubject,
        emailData.emailTitle,
        emailData.emailPayload,
      ),
    };

    return this.transporter.sendMail(mailOptions);
  }
  async sendMailToRecoverPassword(email: string, jwt: string) {
    const emailData = {
      emailSubject: 'Did you forget your password ?',
      emailTitle:
        'Hãy nhấn nút dưới đây rồi điền vào form cấp lại mật khẩu bạn nhé :>',
    };
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: emailData.emailSubject,
      // text: 'Welcome to our app! We hope you enjoy your experience.',
      html: forgotPasswordForm(
        emailData.emailSubject,
        emailData.emailTitle,
        jwt,
      ),
    };

    return this.transporter.sendMail(mailOptions);
  }
}
