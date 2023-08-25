// import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumberString()
  @IsOptional()
  importPrice: number;

  @IsNumberString()
  @IsOptional()
  tax: number;

  @IsNumberString()
  @IsOptional()
  discount: number;

  @IsBoolean()
  @IsOptional()
  new?: boolean;

  @IsBooleanString()
  @IsNotEmpty()
  hot: boolean;

  @IsNumberString()
  @IsNotEmpty()
  categoryId: number;

  @IsNumberString()
  @IsNotEmpty()
  subCategoryId: number;

  // @IsNotEmpty()
  // thumbnail: string;
}
