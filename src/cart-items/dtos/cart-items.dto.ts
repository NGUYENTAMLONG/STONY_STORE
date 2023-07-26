import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
// import { MulterFile } from '../interfaces/multer-file.interface';

export class CreateCartItemDto {
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

export class UpdateCartItemDto {
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
