import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
// import { MulterFile } from '../interfaces/multer-file.interface';
export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  variantId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  addressId: number;

  @IsString()
  @IsNotEmpty()
  phoneRecipient: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsNumberString()
  @IsOptional()
  subtotal?: string;

  @IsNumber()
  @IsOptional()
  tax?: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsString()
  @IsOptional()
  phoneDeliver?: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}

// export class UploadFileDto {
//   //   @ApiProperty({ type: 'string', format: 'binary' })
//   @IsNotEmpty()
//   file: MulterFile;
// }

export class DeleteMultipleDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ids: number[];
}

export class RestoreMultipleDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ids: number[];
}

export class IsDeleteImageDto {
  @IsBoolean()
  @IsOptional()
  isDeleteImage: Boolean;
}
