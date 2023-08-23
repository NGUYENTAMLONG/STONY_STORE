import { IsArray, IsInt, ArrayMinSize, IsNumber } from 'class-validator';

export class DeleteDetailImagesDto {
  @IsArray()
  @ArrayMinSize(1) // Ensure there is at least one ID in the array
  @IsNumber({}, { each: true }) // Ensure each element in the array is a number
  imageIds: number[];
}
