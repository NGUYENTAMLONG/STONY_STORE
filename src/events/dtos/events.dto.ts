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

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  validFrom: Date;

  @IsDateString()
  @IsNotEmpty()
  validTo: Date;

  @IsOptional()
  @IsJSON()
  condition?: Record<string, any>;

  @IsNumber()
  @IsNotEmpty()
  salePercent: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}

export class UpdateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  validFrom?: Date;

  @IsDateString()
  @IsNotEmpty()
  validTo?: Date;

  @IsOptional()
  @IsJSON()
  condition?: Record<string, any>;

  @IsNumber()
  @IsNotEmpty()
  salePercent: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

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
