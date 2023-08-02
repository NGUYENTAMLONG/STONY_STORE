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
config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient,
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
