import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPassworDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class RecoverPassworDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  verifyPassword: string;

  @IsNotEmpty()
  @IsString()
  jwt: string;
}
