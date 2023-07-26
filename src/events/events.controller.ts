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
  CreateEventDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateEventDto,
} from './dtos/events.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { EventsService } from './events.service';
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  public async getEventList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const events = await this.eventsService.getList(page, limit);
    return {
      page,
      limit,
      data: events,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imageEvent', {
      storage: diskStorage({
        destination: './src/public/images/events',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async createEvent(
    @Body() payload: CreateEventDto,
    @UploadedFile() imageEvent: Express.Multer.File,
  ) {
    return this.eventsService.createOneEvent(payload, imageEvent);
  }

  @Patch('/restore/:id')
  public async restoreEvent(
    // @Param('id') eventId: number,
    @Param('id', new ParseIntPipe({ optional: true })) eventId: number,
  ) {
    return this.eventsService.restoreOneEvent(eventId);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('imageEvent', {
      storage: diskStorage({
        destination: './src/public/images/events',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async updateEvent(
    // @Param('id') eventId: number,
    @Param('id', new ParseIntPipe({ optional: true })) eventId: number,
    @Body() payload: UpdateEventDto,
    @UploadedFile() imageEvent?: Express.Multer.File,
  ) {
    return this.eventsService.updateOneEvent(eventId, payload, imageEvent);
  }

  @Get(':id')
  public async findEvent(
    @Param('id', new ParseIntPipe({ optional: true })) eventId: number,
  ) {
    return this.eventsService.getOneById(eventId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteEvent(
    @Param('id', new ParseIntPipe({ optional: true })) eventId: number,
  ) {
    return this.eventsService.softDeleteOneById(eventId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.eventsService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.eventsService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteEvent(
    @Param('id', new ParseIntPipe({ optional: true })) eventId: number,
    @Body() payload: IsDeleteImageDto,
  ) {
    return this.eventsService.forceDeleteOneById(eventId, payload);
  }
}
