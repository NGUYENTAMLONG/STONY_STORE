import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { MailerService } from 'src/mailer/mailer.service';
import { LocalStrategy } from './strategies/local.strategy';
config();

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRED_IN },
    }),
    UsersModule,
  ],
  providers: [
    JwtStrategy,
    AuthService,
    PrismaClient,
    MailerService,
    LocalStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
