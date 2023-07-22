// import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
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

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  importPrice: number;

  @IsNumber()
  @IsOptional()
  tax: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsBoolean()
  @IsNotEmpty()
  new: boolean;

  @IsBoolean()
  @IsNotEmpty()
  hot: boolean;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
