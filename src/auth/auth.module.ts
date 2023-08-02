import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRED_IN },
    }),
    UsersModule,
  ],
  providers: [JwtStrategy, AuthService,PrismaClient],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
