import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MulterFile } from '../interfaces/multer-file.interface';

export class CreateBannerDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}

export class UpdateBannerDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}

export class UploadFileDto {
  //   @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: MulterFile;
}
