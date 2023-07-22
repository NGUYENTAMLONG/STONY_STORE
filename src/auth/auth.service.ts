import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginResponseDto } from './dtos/login-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
      return this.jwtService.decode(jwt, { json: true }) as JwtPayload;
    } catch (e) {
      return null;
    }
  }
}
