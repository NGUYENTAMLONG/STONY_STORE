import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/create-product.dto';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/validators/validation-file';
import { editFileName } from 'src/helpers/file.helper';
import { CreateProductVariantDto } from './dtos/create-product-variant';
import { Variant, VariantParamDto } from './dtos/search-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { DeleteDetailImagesDto } from './dtos/delete.dtos';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('query') query: string,
  ) {
    const { products, total } = await this.productsService.getList(
      page,
      limit,
      query,
    );
    return {
      page,
      limit,
      total,
      data: products,
    };
  }

  @Get('favorite')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async findFavoriteProducts(@Request() req) {
    const products = await this.productsService.findFavoriteProducts(req.user);
    return products;
  }

  @Get(':id')
  public async findOneById(
    @Param('id', new ParseIntPipe({ optional: true })) id: number,
  ) {
    const product = await this.productsService.findOneById(id);
    return product;
  }

  @Get(':id/:variant')
  public async findVariantByProduct(
    @Param('id', new ParseIntPipe({ optional: true })) id: number,
    @Param('variant') variant?: Variant,
  ) {
    const result = await this.productsService.findVariantOfProduct(id, variant);
    return result;
  }

  @Post()
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      // Enable file size limits
      limits: {
        fileSize: 5000000, //(5MB) //+process.env.MAX_FILE_SIZE,
      },
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './src/public/images/thumbnails',
        filename: editFileName,
      }),
    }),
    // FilesInterceptor('files', 7, {
    //   fileFilter: imageFileFilter,
    //   limits: {
    //     fileSize: 20000, //+process.env.MAX_FILE_SIZE,
    //   },
    //   storage: diskStorage({
    //     destination: './src/public/images/details',
    //     filename: editFileName,
    //   }),
    // }),
  )
  public async createProduct(
    @Request() req,
    @UploadedFile() thumbnail,
    @Body() payload:CreateProductDto,
    @Body() variants?: CreateProductVariantDto[],
  ) {
    console.log('thumbnail', thumbnail);
    console.log('payload', payload);
    return payload;
    // return this.productsService.createOneProduct(
    //   req.user,
    //   payload,
    //   thumbnail,
    //   variants,
    // );
  }
  // TESTTTTTTTTTTTTT
  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('thumbnail', {
  //     // Enable file size limits
  //     limits: {
  //       fileSize: 5000000, //(5MB) //+process.env.MAX_FILE_SIZE,
  //     },
  //     fileFilter: imageFileFilter,
  //     storage: diskStorage({
  //       destination: './src/public/images/thumbnails',
  //       filename: editFileName,
  //     }),
  //   }),
  // )
  // async uploadFile(@UploadedFile() file, @Body() payload) {
  //   // Process the uploaded file
  //   console.log('payload:', payload);
  //   console.log('File:', file);
  //   return { file, payload };
  //   // Return response or perform further operations
  // }
  // TESTTTTTTTTTTTTT

  @Post('/:id/upload-detail-images')
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('imageDetails', 7, {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5000000, //+process.env.MAX_FILE_SIZE,
      },
      storage: diskStorage({
        destination: './src/public/images/details',
        filename: editFileName,
      }),
    }),
  )
  public async createProductImageDetails(
    @Request() req,
    @Param('id', new ParseIntPipe({ optional: true })) id: number,
    @UploadedFiles() imageDetails: Express.Multer.File[],
  ) {
    return this.productsService.uploadDetailImages(req.user, id, imageDetails);
  }

  @Post('/:id/create-variants')
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
  public async createProductVariants(
    @Request() req,
    @Param('id', new ParseIntPipe({ optional: true })) productId: number,
    @Body() variants: CreateProductVariantDto[],
  ) {
    return this.productsService.createProductVariants(
      req.user,
      productId,
      variants,
    );
  }

  @Delete('/soft-delete/:id')
  public async softDeleteProduct(@Param('id') id: number) {
    const result = await this.productsService.softDeleteOne(id);
    return result;
  }

  @Delete('/force-delete/:id')
  public async forceDeleteProduct(@Param('id') id: number) {
    const result = await this.productsService.forceDeleteOne(id);
    return result;
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      // Enable file size limits
      limits: {
        fileSize: 5000000, //+process.env.MAX_FILE_SIZE,
      },
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './src/public/images/thumbnails',
        filename: editFileName,
      }),
    }),
  )
  public async updateProduct(
    @Param('id', new ParseIntPipe({ optional: true })) productId: number,
    @Body() payload: UpdateProductDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
    // @Body() variants?: CreateProductVariantDto[],
  ) {
    return this.productsService.updateOneProduct(productId, payload, thumbnail);
  }

  @Delete('/delete-detail-images')
  public async DeleteProductDetailImages(
    @Body() payload: DeleteDetailImagesDto,
  ) {
    return this.productsService.deleteImageDetails(payload);
  }
  // @Delete('/soft-delete-many')
  // public async softDeleteProducts(@Body() payload: UserIdArrayDto) {
  //   const result = await this.productsService.softDeleteMultiple(payload);
  //   return result;
  // }
  // @Delete('/force-delete-many')
  // public async forceDeleteProducts(@Body() payload: UserIdArrayDto) {
  //   const result = await this.productsService.forceDeleteMultiple(payload);
  //   return result;
  // }
}
