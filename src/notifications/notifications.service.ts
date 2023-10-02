import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PrismaClient,
  PrivateNotification,
  PublicNotification,
  User,
} from '@prisma/client';
import { CreatePublicNotificationDto } from './dtos/notification.dto';
import { EXCEPTION_PUBLIC_NOTIFICATION } from './constants/notification.constant';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async findPublicNotificationList(
    page: number,
    limit: number,
  ): Promise<PublicNotification[]> {
    try {
      const offset = (page - 1) * limit;
      const foundNotifications = await this.prisma.publicNotification.findMany({
        skip: offset,
        take: limit,
      });
      return foundNotifications;
    } catch (error) {
      console.log('errorFindPublicNotification', error);
      return error;
    }
  }

  public async findOnePublicNotification(
    notificationId: number,
  ): Promise<PublicNotification> {
    try {
      const foundPublicNotification =
        await this.prisma.publicNotification.findFirst({
          where: {
            id: notificationId,
          },
        });
      return foundPublicNotification;
    } catch (error) {
      console.log('errorFindOnePublicNotification', error);
      return error;
    }
  }

  public async createOnePublicNotification(
    userReq: User,
    payload: CreatePublicNotificationDto,
    thumbnail?: Express.Multer.File,
  ): Promise<PublicNotification> {
    try {
      const { title, content, attachment, link, preview } = payload;
      // if (attachment) {
      //   //>>>>>>>>>>>>>
      // }
      const createdPublicNotification =
        await this.prisma.publicNotification.create({
          data: {
            title,
            preview,
            content,
            link,
            senderId: userReq.id,
            thumbnail: !thumbnail
              ? `/images/notifications/public/thumbnails/noti-thumb-default.png`
              : `/images/thumbnails/${thumbnail.filename}`,
            createdBy: userReq.id,
          },
        });
      //socket ....
      return createdPublicNotification;
    } catch (error) {
      console.log({ createdProductError: error });
      return error;
    }
  }

  public async updateOnePublicNotification(
    userReq: User,
    notificationId: number,
    payload: CreatePublicNotificationDto,
    thumbnail?: Express.Multer.File,
  ): Promise<PublicNotification> {
    try {
      const foundPublicNotification =
        await this.prisma.publicNotification.findFirst({
          where: {
            id: notificationId,
          },
        });
      if (!foundPublicNotification) {
        throw new BadRequestException(
          EXCEPTION_PUBLIC_NOTIFICATION.PUBLIC_NOTIFICATION_NOT_FOUND,
        );
      }
      const { title, content, attachment, link, preview } = payload;
      // if (attachment) {
      //   //>>>>>>>>>>>>>
      // }
      const updatedPublicNotification =
        await this.prisma.publicNotification.update({
          where: {
            id: notificationId,
          },
          data: {
            title,
            preview,
            content,
            link,
            senderId: userReq.id,
            thumbnail: !thumbnail
              ? `/images/notifications/public/thumbnails/noti-thumb-default.png`
              : `/images/thumbnails/${thumbnail.filename}`,
            createdBy: userReq.id,
          },
        });
      return updatedPublicNotification;
    } catch (error) {
      console.log({ updateNotificationError: error });
      return error;
    }
  }

  public async softDeleteOnePublicNotification(
    userReq: User,
    notificationId: number,
  ): Promise<PublicNotification> {
    try {
      const foundPublicNotification =
        await this.prisma.publicNotification.findFirst({
          where: {
            id: notificationId,
          },
        });
      if (!foundPublicNotification) {
        throw new BadRequestException(
          EXCEPTION_PUBLIC_NOTIFICATION.PUBLIC_NOTIFICATION_NOT_FOUND,
        );
      }

      const deletedPublicNotification =
        await this.prisma.publicNotification.update({
          where: {
            id: notificationId,
          },
          data: {
            deletedFlg: true,
            deletedAt: new Date(),
            updatedBy: userReq.id,
          },
        });
      return deletedPublicNotification;
    } catch (error) {
      console.log({ deleteNotificationError: error });
      return error;
    }
  }

  public async forceDeleteOnePublicNotification(
    notificationId: number,
  ): Promise<PublicNotification> {
    try {
      const foundPublicNotification =
        await this.prisma.publicNotification.findFirst({
          where: {
            id: notificationId,
          },
        });
      if (!foundPublicNotification) {
        throw new BadRequestException(
          EXCEPTION_PUBLIC_NOTIFICATION.PUBLIC_NOTIFICATION_NOT_FOUND,
        );
      }

      const forceDeletedPublicNotification =
        await this.prisma.publicNotification.delete({
          where: {
            id: notificationId,
          },
        });
      return forceDeletedPublicNotification;
    } catch (error) {
      console.log({ forceDeleteNotificationError: error });
      return error;
    }
  }

  // _____________ Private Public ________________________
  public async createOnePrivateNotification(
    userReq: User,
    payload: CreatePublicNotificationDto,
    thumbnail?: Express.Multer.File,
  ): Promise<PublicNotification> {
    try {
      const { title, content, attachment, link, preview } = payload;
      // if (attachment) {
      //   //>>>>>>>>>>>>>
      // }
      const createdPublicNotification =
        await this.prisma.privateNotification.create({
          data: {
            title,
            preview,
            content,
            link,
            senderId: userReq.id,
            recipientId: 1,
            thumbnail: !thumbnail
              ? `/images/notifications/public/thumbnails/noti-thumb-default.png`
              : `/images/thumbnails/${thumbnail.filename}`,
            createdBy: userReq.id,
          },
        });
      //socket ....
      return createdPublicNotification;
    } catch (error) {
      console.log({ createdProductError: error });
      return error;
    }
  }
}
