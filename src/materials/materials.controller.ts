import {
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import {
  CreateMaterialDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateMaterialDto,
} from './dtos/materials.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  public async getMaterialList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const materials = await this.materialsService.getList(page, limit);
    return {
      page,
      limit,
      data: materials,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('material', {
      storage: diskStorage({
        destination: './src/public/images/materials',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async createMaterial(
    @Body() payload: CreateMaterialDto,
    @UploadedFile() material: Express.Multer.File,
  ) {
    return this.materialsService.createOneMaterial(payload, material);
  }

  @Patch('/restore/:id')
  public async restoreMaterial(
    // @Param('id') bannerId: number,
    @Param('id', new ParseIntPipe({ optional: true })) materialId: number,
  ) {
    return this.materialsService.restoreOneMaterial(materialId);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('material', {
      storage: diskStorage({
        destination: './src/public/images/materials',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async updateMaterial(
    // @Param('id') bannerId: number,
    @Param('id', new ParseIntPipe({ optional: true })) materialId: number,
    @Body() payload: UpdateMaterialDto,
    @UploadedFile() material?: Express.Multer.File,
  ) {
    return this.materialsService.updateOneMaterial(
      materialId,
      payload,
      material,
    );
  }

  @Get(':id')
  public async findMaterial(
    @Param('id', new ParseIntPipe({ optional: true })) materialId: number,
  ) {
    return this.materialsService.getOneById(materialId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteMaterial(
    @Param('id', new ParseIntPipe({ optional: true })) materialId: number,
  ) {
    return this.materialsService.softDeleteOneById(materialId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.materialsService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.materialsService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteMaterial(
    @Param('id', new ParseIntPipe({ optional: true })) materialId: number,
    @Body() payload: IsDeleteImageDto,
  ) {
    return this.materialsService.forceDeleteOneById(materialId, payload);
  }
}
