// import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsJSON,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  keywords: string[];

  //   @IsString()
  //   @IsOptional()
  //   attachment?: string;

  //   @IsString()
  //   @IsOptional()
  //   thumbnail?: string;

  @IsString()
  @IsOptional()
  link?: string;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  keywords?: string[];

  //   @IsString()
  //   @IsOptional()
  //   attachment?: string;

  //   @IsString()
  //   @IsOptional()
  //   thumbnail?: string;

  @IsString()
  @IsOptional()
  link?: string;
}

// Post Category

export class CreatePostCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nameEN?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}

export class UpdatePostCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nameEN?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}
