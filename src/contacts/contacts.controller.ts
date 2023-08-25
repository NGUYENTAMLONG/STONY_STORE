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
  UploadedFiles,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import {
  CreateContactDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateContactDto,
} from './dtos/contacts.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  public async getContactList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const contacts = await this.contactsService.getList(page, limit);
    return {
      page,
      limit,
      data: contacts,
    };
  }

  // @Post()
  // @UseInterceptors(
  //   FilesInterceptor('contactImages', 10, {
  //     storage: diskStorage({
  //       destination: './src/public/images/contacts',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // public async createContact(
  //   @Body() payload: CreateContactDto,
  //   @UploadedFiles() contactImages: Express.Multer.File[],
  // ) {
  //   return this.contactsService.createOneContact(payload, contactImages);
  // }

  @Patch('/restore/:id')
  public async restoreContact(
    @Param('id', new ParseIntPipe({ optional: true })) contactId: number,
  ) {
    return this.contactsService.restoreOneContact(contactId);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('contactImages', 10, {
      storage: diskStorage({
        destination: './src/public/images/contacts',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  // public async updateContact(
  //   @Param('id', new ParseIntPipe({ optional: true })) contactId: number,
  //   @Body() payload: UpdateContactDto,
  //   @UploadedFiles() contactImages?: Express.Multer.File[],
  // ) {
  //   return this.contactsService.updateOneContact(
  //     contactId,
  //     payload,
  //     contactImages,
  //   );
  // }

  @Get(':id')
  public async findContact(
    @Param('id', new ParseIntPipe({ optional: true })) contactId: number,
  ) {
    return this.contactsService.getOneById(contactId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteContact(
    @Param('id', new ParseIntPipe({ optional: true })) contactId: number,
  ) {
    return this.contactsService.softDeleteOneById(contactId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.contactsService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.contactsService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteContact(
    @Param('id', new ParseIntPipe({ optional: true })) contactId: number,
    @Body() payload: IsDeleteImageDto,
  ) {
    return this.contactsService.forceDeleteOneById(contactId, payload);
  }
}
