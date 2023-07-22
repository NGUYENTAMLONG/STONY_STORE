// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserIdArrayDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Transform(({ value }) => value.map(Number)) // optional: transform the array elements to numbers
  userIds: number[];
}

export class ChangePasswordDto {
  @IsString()
  @IsOptional()
  newPassword: string;

  @IsString()
  @IsOptional()
  passwordConfirm: string;
}

export class ChangeUsernameDto {
  @IsString()
  @IsOptional()
  newUsername: string;
}
