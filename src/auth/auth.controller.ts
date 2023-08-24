import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EXCEPTION_AUTH } from './constants/auth.constant';
import { Response } from 'express';
import { RegisterDto } from './dtos/register.dto';

// @ApiTags('auth')
// @Controller({ version: ['1'], path: 'auth' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  //   @ApiOperation({ summary: 'Login' })
  public async login(@Body() body: LoginDto) {
    const {
      username,
      password,
      // email
    } = body;
    if (
      !username
      // && !email
    ) {
      throw new UnauthorizedException(EXCEPTION_AUTH.UNDEFINED_EMAIL_USERNAME);
    }

    let user = null;
    if (username) {
      user = await this.authService.validateUserByUsername(username, password);
    }
    // else {
    //   user = await this.authService.validateUserByEmail(email, password);
    // }

    if (!user) {
      throw new UnauthorizedException(EXCEPTION_AUTH.WRONG_PASSWORD);
    }
    return this.authService.login(user);
  }

  // @Post('logout')
  // async logout(
  //   @Req() request: Request,
  //   @Res({ passthrough: true }) response: Response,
  // ): Promise<{ success: true }> {
  //   await this.authService.logout(request, response);
  //   return { success: true };
  // }

  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<any> {
    return this.authService.register(payload);
  }

  @Get('verify/:jwt')
  async verifyAccount(@Param('jwt') jwtVerify: string): Promise<any> {
    return this.authService.verifyJwt(jwtVerify);
  }
}
