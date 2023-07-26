import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
// import { MulterFile } from '../interfaces/multer-file.interface';

export class CreateVoucherDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsDateString()
  @IsOptional()
  validFrom: Date;

  @IsDateString()
  @IsOptional()
  validTo: Date;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}

export class UpdateVoucherDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsDateString()
  @IsOptional()
  validFrom: Date;

  @IsDateString()
  @IsOptional()
  validTo: Date;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

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
