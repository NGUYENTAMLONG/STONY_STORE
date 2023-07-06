import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EXCEPTION_AUTH } from './constants/auth.constant';

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
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
