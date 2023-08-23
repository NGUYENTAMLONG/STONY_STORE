// import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductVariantDto {
  @IsNumberString()
  @IsOptional()
  sizeId?: number;

  @IsNumberString()
  @IsOptional()
  colorId?: number;

  @IsNumberString()
  @IsOptional()
  stock?: number;

  @IsNumberString()
  @IsOptional()
  productId?: number;

  @IsNumberString()
  @IsOptional()
  materialId?: number;
}
