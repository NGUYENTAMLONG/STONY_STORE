import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  CreatePublicNotificationDto,
  UpdatePublicNotificationDto,
} from './dtos/notification.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserType } from '@prisma/client';
import { imageFileFilter } from 'src/validators/validation-file';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('')
  async getPublicNotificationList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const publicNotifications =
      await this.notificationsService.findPublicNotificationList(page, limit);
    return {
      page,
      limit,
      data: publicNotifications,
    };
  }

  @Get(':id')
  async getOnePublicNotification(
    @Param('id', new ParseIntPipe({ optional: true })) notificationId: number,
  ) {
    return this.notificationsService.findOnePublicNotification(notificationId);
  }

  @Post('/create-public')
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
        destination: './src/public/images/notifications/public/thumbnails',
        filename: editFileName,
      }),
    }),
  )
  createOnePublicNotification(
    @Request() req,
    @Body() payload: CreatePublicNotificationDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.notificationsService.createOnePublicNotification(
      req.user,
      payload,
      thumbnail,
    );
  }

  @Put('/update-public/:id')
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
        destination: './src/public/images/notifications/public/thumbnails',
        filename: editFileName,
      }),
    }),
  )
  updateOnePublicNotification(
    @Request() req,
    @Param('id', new ParseIntPipe({ optional: true })) notificationId: number,
    @Body() payload: UpdatePublicNotificationDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.notificationsService.updateOnePublicNotification(
      req.user,
      notificationId,
      payload,
      thumbnail,
    );
  }

  @Delete('/soft-delete-public/:id')
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
  softDeleteOnePublicNotification(
    @Request() req,
    @Param('id', new ParseIntPipe({ optional: true })) notificationId: number,
  ) {
    return this.notificationsService.softDeleteOnePublicNotification(
      req.user,
      notificationId,
    );
  }

  @Delete('/force-delete-public/:id')
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
  forceDeleteOnePublicNotification(
    @Param('id', new ParseIntPipe({ optional: true })) notificationId: number,
  ) {
    return this.notificationsService.forceDeleteOnePublicNotification(
      notificationId,
    );
  }
  // _______________ private ________________________
  @Post('/create-private')
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
        destination: './src/public/images/notifications/public/thumbnails',
        filename: editFileName,
      }),
    }),
  )
  createOnePrivateNotification(
    @Request() req,
    @Body() payload: CreatePublicNotificationDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.notificationsService.createOnePrivateNotification(
      req.user,
      payload,
      thumbnail,
    );
  }
}
