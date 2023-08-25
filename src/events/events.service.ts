import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Event, PrismaClient } from '@prisma/client';
import {
  CreateEventDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateEventDto,
} from './dtos/events.dto';
import { EXCEPTION_EVENT } from './constants/event.constant';
import * as fs from 'fs';
@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Event[]> {
    try {
      const offset = (page - 1) * limit;
      const events = await this.prisma.event.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return events;
    } catch (error) {
      console.log({ eventListError: error });
      return error;
    }
  }

  public async createOneEvent(
    payload: CreateEventDto,
    imageEvent: Express.Multer.File,
  ): Promise<Event> {
    try {
      const {
        title,
        discount,
        salePercent,
        validFrom,
        validTo,
        condition,
        introduction,
        description,
        metadata,
      } = payload;
      const {
        fieldname,
        mimetype,
        originalname,
        size,
        buffer,
        filename,
        destination,
        path,
        stream,
      } = imageEvent;
      const createEvent = await this.prisma.event.create({
        data: {
          title,
          discount,
          salePercent,
          validFrom,
          validTo,
          condition,
          introduction,
          description,
          image: `/images/events/${filename}`,
          metadata: metadata,
        },
      });
      return createEvent;
    } catch (error) {
      console.log({ createEventError: error });
      return error;
    }
  }

  public async updateOneEvent(
    eventId: number,
    payload: UpdateEventDto,
    imageEvent?: Express.Multer.File,
  ): Promise<Event> {
    try {
      const {
        title,
        discount,
        salePercent,
        validFrom,
        validTo,
        condition,
        introduction,
        description,
        metadata,
      } = payload;
      const foundEvent = await this.prisma.event.findFirst({
        where: {
          id: eventId,
        },
      });
      if (!foundEvent) {
        throw new BadRequestException(EXCEPTION_EVENT.EVENT_NOT_FOUND);
      }
      let data = {
        title,
        description,
        metadata: metadata,
      };
      if (imageEvent?.filename) {
        data['image'] = `/images/events/${imageEvent.filename}`;
      }
      const updateEvent = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data,
      });
      return updateEvent;
    } catch (error) {
      console.log({ updateEventError: error });
      return error;
    }
  }

  public async getOneById(eventId: number): Promise<Event> {
    try {
      const foundEventById = await this.prisma.event.findFirst({
        where: {
          id: eventId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundEventById;
    } catch (error) {
      console.log({ foundEventByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(eventId: number): Promise<Event> {
    try {
      const foundEvent = await this.prisma.event.findFirst({
        where: {
          id: eventId,
        },
      });
      if (!foundEvent) {
        throw new BadRequestException(EXCEPTION_EVENT.EVENT_NOT_FOUND);
      }

      const softDeleteEventById = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteEventById;
    } catch (error) {
      console.log({ softDeleteEventByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleEvents = await this.prisma.event.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleEvents;
    } catch (error) {
      console.log({ softDeleteMultipleEventByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleEvents = await this.prisma.event.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleEvents;
    } catch (error) {
      console.log({ restoreMultipleEventByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneEvent(eventId: number): Promise<Event> {
    try {
      const foundEvent = await this.prisma.event.findFirst({
        where: {
          id: eventId,
          deletedFlg: true,
        },
      });
      if (!foundEvent) {
        throw new BadRequestException(EXCEPTION_EVENT.EVENT_NOT_FOUND);
      }

      const restoreEventById = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreEventById;
    } catch (error) {
      console.log({ restoreEventByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(
    eventId: number,
    payload: IsDeleteImageDto,
  ): Promise<Event> {
    try {
      const foundEvent = await this.prisma.event.findFirst({
        where: {
          id: eventId,
        },
      });
      if (!foundEvent) {
        throw new BadRequestException(EXCEPTION_EVENT.EVENT_NOT_FOUND);
      }

      if (payload?.isDeleteImage) {
        await fs.promises.unlink(`./src/public/${foundEvent.image}`);
      }

      const forceDeleteEventById = await this.prisma.event.delete({
        where: {
          id: eventId,
        },
      });
      return forceDeleteEventById;
    } catch (error) {
      console.log({ forceDeleteEventByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleEvents = await this.prisma.event.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleEvents;
    } catch (error) {
      console.log({ softDeleteMultipleEventByIdArrayError: error });
      return error;
    }
  }
}
