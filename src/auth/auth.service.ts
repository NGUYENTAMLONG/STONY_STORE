import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginResponseDto } from './dtos/login-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PrismaClient, User } from '@prisma/client';
import { Response } from 'express';
import { config } from 'dotenv';
import { EXCEPTION_USER } from 'src/users/constants/user.contant';
import { RegisterDto } from './dtos/register.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { EXCEPTION_AUTH } from './constants/auth.constant';
config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient,
    private readonly mailerService: MailerService,
  ) {}
  async validateUserByUsername(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }
    return this.compareAccount(password, user);
  }

  //
  async validateUserByEmail(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }
    return this.compareAccount(password, user);
  }
  //
  async compareAccount(password: string, user: User): Promise<User | null> {
    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<loginResponseDto> {
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      isAdministrator: user.isAdministrator,
    };

    return {
      username: payload.username,
      accessToken: this.jwtService.sign(payload),
    };
  }
  async register(payload: RegisterDto): Promise<any> {
    try {
      const { email, username, password } = payload;
      //check existed username or email
      const checkExistedEmail = await this.prisma.profile.findFirst({
        where: {
          email,
        },
      });
      const checkExistedUsername = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      if (checkExistedEmail) {
        throw new BadRequestException(EXCEPTION_AUTH.EMAIL_EXISTED);
      }
      if (checkExistedUsername) {
        throw new BadRequestException(EXCEPTION_AUTH.USERNAME_EXISTED);
      }
      //Check validate password ...
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          userType: 'CUSTOMER',
          isAdministrator: false,
        },
      });
      await this.mailerService.sendVerifyEmail(createUser.id, email, username);
      return { status: 200, message: 'Welcome email sent successfully' };
    } catch (error) {
      console.log('error hehehehehe');
    }
  }
  async verifyJwt(jwtVerify: string): Promise<any> {
    try {
      const result = this.jwtService.verify(jwtVerify, {
        secret: process.env.TOKEN_SECRET,
      });
      const { userId, email } = result;
      const setActiveAccount = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isActive: true,
        },
      });
      const createEmailProfile = await this.prisma.profile.create({
        data: {
          firstName: '',
          lastName: '',
          email,
          userId: Number(userId),
        },
      });
      const createSetting = await this.prisma.userSetting.create({
        data: {
          userId,
        },
      });
      const createCart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
      return { status: 201, message: 'SETUP SUCCESSFUL' };
    } catch (error) {
      console.log(error);
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException(EXCEPTION_AUTH.TOKEN_EXPIRED_VERIFY);
      }
    }
  }
  private encode(user: User) {
    const access_token = this.generateToken(user);

    return {
      access_token,
      id: user.id,
      user: user.username,
    };
  }

  private generateToken(user: User) {
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      isAdministrator: user.isAdministrator,
    };
    return this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRED_IN,
    });
  }

  public decode(token: string) {
    try {
      const jwt = token.replace('Bearer ', '');
      return this.jwtService.decode(jwt) as JwtPayload;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async logout(request: Request, response: Response): Promise<void> {
    // const user = await this.prisma.user.findUnique({ where: { id } });
    // if (!user) throw new NotFoundException(EXCEPTION_USER.USER_NOT_FOUND);
    // await this.prisma.session.deleteMany({
    //   where: {
    //     userId: id,
    //   },
    // });
    localStorage.removeItem('jwtToken');
    window.location.href = '/login'; // Replace '/login' with the desired URL
    response.clearCookie(process.env.COOKIE_LOGIN_NAME, {
      domain: process.env.FRONTEND_DOMAIN,
    });
  }
}
