import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  Request,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EXCEPTION_AUTH } from './constants/auth.constant';
import { Response } from 'express';
import { RegisterDto, VerifyAgainDto } from './dtos/register.dto';
import {
  ForgotPassworDto,
  RecoverPassworDto,
} from './dtos/forgot-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { origin } from 'src/configs/cors.config';

// @ApiTags('auth')
// @Controller({ version: ['1'], path: 'auth' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  //   @ApiOperation({ summary: 'Login' })
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<any> {
    return this.authService.register(payload);
  }

  @Get('verify/:jwt')
  async verifyAccount(@Param('jwt') jwtVerify: string): Promise<any> {
    return this.authService.verifyJwt(jwtVerify);
  }
  /********************** */
  @Get('get-recover-password-form/:jwt')
  getRecoverPasswordForm(@Param('jwt') jwtVerify: string, @Res() res): any {
    const redirectUrl = `${origin[1]}/recover-password?jwt=${jwtVerify}`;
    res.redirect(redirectUrl);
  }
  /********************** */

  @Post('verify-again')
  async verifyAgain(@Body() payload: VerifyAgainDto): Promise<any> {
    return this.authService.verifyAgain(payload);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() payload: ForgotPassworDto): Promise<any> {
    return this.authService.forgotPassword(payload);
  }

  @Post('recover-password')
  async recoverPassword(@Body() payload: RecoverPassworDto): Promise<any> {
    return this.authService.recoverPassword(payload);
  }

  // @Post('logout')
  // async logout(
  //   @Req() request: Request,
  //   @Res({ passthrough: true }) response: Response,
  // ): Promise<{ success: true }> {
  //   await this.authService.logout(request, response);
  //   return { success: true };
  // }
}
