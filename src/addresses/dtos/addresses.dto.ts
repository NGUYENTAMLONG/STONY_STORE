import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
// import { MulterFile } from '../interfaces/multer-file.interface';

export class CreateAddressDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsNotEmpty()
  @IsString()
  detailAddress: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}

export class UpdateAddressDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  detailAddress?: string;

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
