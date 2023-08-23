// import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Variant {
  Color = 'color',
  Material = 'material',
  Size = 'size',
}

export class VariantParamDto {
  @IsOptional()
  @IsEnum(Variant, {
    message: 'Invalid variant. Allowed values are color, material, size',
  })
  variant?: Variant;
}
