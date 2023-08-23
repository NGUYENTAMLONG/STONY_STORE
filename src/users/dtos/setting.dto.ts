// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Languages, Themes } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsBoolean()
  @IsOptional()
  darkMode: boolean;

  @IsEnum(Themes)
  @IsOptional()
  @IsString()
  themes: string;

  @IsEnum(Languages)
  @IsOptional()
  @IsString()
  languages: string;
}
