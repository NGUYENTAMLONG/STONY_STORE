// import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsNumberString()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumberString()
  @IsOptional()
  importPrice?: number;

  @IsNumberString()
  @IsOptional()
  tax?: number;

  @IsNumberString()
  @IsOptional()
  discount?: number;

  @IsBoolean()
  @IsOptional()
  new?: boolean;

  @IsBooleanString()
  @IsOptional()
  hot?: boolean;

  @IsNumberString()
  @IsOptional()
  categoryId?: number;

  @IsNumberString()
  @IsOptional()
  subCategoryId?: number;

  // @IsOptional()
  // thumbnail?: string;
}
