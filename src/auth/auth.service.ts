import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';
import { loginResponseDto } from './dtos/login-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PrismaClient, User } from '@prisma/client';
import { Response } from 'express';
import { config } from 'dotenv';
import { EXCEPTION_USER } from 'src/users/constants/user.contant';
import { RegisterDto, VerifyAgainDto } from './dtos/register.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { EXCEPTION_AUTH } from './constants/auth.constant';
import {
  ForgotPassworDto,
  RecoverPassworDto,
} from './dtos/forgot-password.dto';
import { validatePassword } from 'src/helpers/validate.helper';
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

  // ***************
  async validateUserByEmail(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }
    return this.compareAccount(password, user);
  }
  // ***************
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
      role: user.userType,
    };
    // response.cookie('jwt', jwt, { httpOnly: true }); ---> consider
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
      const checkValidate = validatePassword(password);

      if (!checkValidate.isValid) {
        return checkValidate;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          userType: 'CUSTOMER',
          isAdministrator: false,
        },
      });
      const createEmailProfile = await this.prisma.profile.create({
        data: {
          firstName: '',
          lastName: '',
          email,
          userId: createUser.id,
          createdBy: createUser.id,
        },
      });
      await this.mailerService.sendVerifyEmail(createUser.id, email, username);
      return { status: 200, message: 'Welcome email sent successfully' };
    } catch (error) {
      return error;
    }
  }
  async verifyJwt(jwtVerify: string): Promise<any> {
    try {
      const result = this.jwtService.verify(jwtVerify, {
        secret: process.env.TOKEN_SECRET,
      });
      const { userId, email, verifyAgain, resetedPassword } = result;

      const checkActiveAccount = await this.prisma.user.findFirst({
        where: { id: userId },
      });
      if (checkActiveAccount.isActive) {
        return { status: 201, message: 'SETUP SUCCESSFUL ALREADY' };
      }

      const initialResult = await this.initializeUserDependencies(userId);

      // verify again
      if (verifyAgain && resetedPassword) {
        const foundUser = await this.prisma.user.findFirst({
          where: {
            id: userId,
          },
        });
        await this.mailerService.sendResultVerifyAgain(
          userId,
          email,
          foundUser.username,
          resetedPassword,
        );
      }

      console.log(initialResult);
      return { status: 201, message: 'SETUP SUCCESSFUL' };
    } catch (error) {
      console.log(error);
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException(EXCEPTION_AUTH.TOKEN_EXPIRED_VERIFY);
      }
    }
  }
  async verifyAgain(payload: VerifyAgainDto): Promise<any> {
    try {
      const { email } = payload;
      //check existed username or email
      const checkExistedEmail = await this.prisma.profile.findFirst({
        where: {
          email,
        },
      });

      if (!checkExistedEmail) {
        throw new BadRequestException(EXCEPTION_AUTH.EMAIL_DOES_NOT_EXIST);
      }

      const checkExistedUser = await this.prisma.user.findFirst({
        where: {
          id: checkExistedEmail && checkExistedEmail.userId,
        },
      });

      if (checkExistedUser && checkExistedUser.isActive === true) {
        throw new BadRequestException(EXCEPTION_AUTH.USER_EXISTED);
      }
      //Check validate password ...
      const passwordGenerated = generator.generate({
        length: 10,
        numbers: true,
      });
      const hashedPassword = await bcrypt.hash(passwordGenerated, 10);

      const updatePwUser = await this.prisma.user.update({
        where: {
          id: checkExistedUser.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      await this.mailerService.reSendVerifyEmail(
        checkExistedUser.id,
        email,
        checkExistedUser.username,
        passwordGenerated,
      );
      return { status: 200, message: 'Welcome email sent successfully' };
    } catch (error) {
      return error;
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
  async forgotPassword(payload: ForgotPassworDto): Promise<any> {
    try {
      const { email } = payload;
      const foundEmailProfile = await this.prisma.profile.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (!foundEmailProfile) {
        throw new BadRequestException(EXCEPTION_AUTH.EMAIL_DOES_NOT_EXIST);
      }
      const jwt = this.jwtService.sign({
        userId: foundEmailProfile.userId,
        email,
      });
      await this.mailerService.sendMailToRecoverPassword(email, jwt);
      return { status: 200, message: 'Sent mail to recover password !' };
    } catch (error) {
      return error;
    }
  }

  async recoverPassword(payload: RecoverPassworDto): Promise<any> {
    try {
      const { newPassword, verifyPassword, jwt } = payload;
      if (newPassword !== verifyPassword) {
        throw new BadRequestException(
          EXCEPTION_AUTH.PASSWORD_DOES_NOT_MATCH_CONFIRM_PASSWORD,
        );
      }
      const explaintedJwt = this.jwtService.verify(jwt);
      if (!explaintedJwt || !explaintedJwt.userId || !explaintedJwt.email) {
        throw new BadRequestException(EXCEPTION_AUTH.INVALID_TOKEN);
      }
      //Check validate password ...
      const checkValidate = validatePassword(newPassword);

      if (!checkValidate.isValid) {
        return checkValidate;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePwUser = await this.prisma.user.update({
        where: {
          id: explaintedJwt?.userId,
        },
        data: {
          password: hashedPassword,
        },
      });

      return updatePwUser;
    } catch (error) {
      return error;
    }
  }

  async initializeUserDependencies(userId) {
    const setActiveAccountPromise = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: true,
        createdBy: userId,
      },
    });

    const createSettingPromise = this.prisma.userSetting.create({
      data: {
        userId,
        createdBy: userId,
      },
    });

    const createCartPromise = this.prisma.cart.create({
      data: {
        userId,
        createdBy: userId,
      },
    });

    const initFavoritePromise = this.prisma.favorite.create({
      data: {
        userId,
        createdBy: userId,
      },
    });

    const initPurchaseHistoryPromise = this.prisma.purchaseHistory.create({
      data: {
        userId,
        createdBy: userId,
      },
    });

    const results = await Promise.all([
      setActiveAccountPromise,
      initFavoritePromise,
      initPurchaseHistoryPromise,
      createSettingPromise,
      createCartPromise,
    ]);

    return results;
  }
}
