// import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
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
  // @Transform((value) => Number(value))
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsNumberString()
  @IsOptional()
  // @Transform((value) => Number(value))
  importPrice: number;

  @IsNumberString()
  @IsOptional()
  // @Transform((value) => Number(value))
  tax: number;

  @IsNumberString()
  @IsOptional()
  // @Transform((value) => Number(value))
  discount: number;

  @IsBoolean()
  @IsOptional()
  // @Transform((value) => Boolean(value))
  new?: boolean;

  @IsBoolean()
  @IsOptional()
  // @Transform((value) => Boolean(value))
  hot: boolean;

  @IsNumberString()
  @IsNotEmpty()
  // @Transform((value) => Number(value))
  categoryId: number;

  @IsNumberString()
  @IsNotEmpty()
  // @Transform((value) => Number(value))
  subCategoryId: number;

  // @IsNotEmpty()
  // thumbnail: string;
}
