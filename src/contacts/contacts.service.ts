import { BadRequestException, Injectable } from '@nestjs/common';
import { Contact, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import {
  CreateContactDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
} from './dtos/contacts.dto';
import { EXCEPTION_CONTACT } from './contants/contact.constant';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Contact[]> {
    try {
      const offset = (page - 1) * limit;
      const contact = await this.prisma.contact.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return contact;
    } catch (error) {
      console.log({ contactListError: error });
      return error;
    }
  }

  public async createOneContact(
    payload: CreateContactDto,
    imageContact: Express.Multer.File,
  ): Promise<Contact> {
    try {
      const { title, content, metadata } = payload;
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
      } = imageContact;
      const createContact = await this.prisma.contact.create({
        data: {
          title,
          content,
          image: `/images/contacts/${filename}`,
          // metadata,
        },
      });
      return createContact;
    } catch (error) {
      console.log({ createContactError: error });
      return error;
    }
  }

  // public async updateOneContact(
  //   contactId: number,
  //   payload: CreateContactDto,
  //   imageContact?: Express.Multer.File[],
  // ): Promise<Contact> {
  //   try {
  //     const { title, content, metadata } = payload;
  //     const foundContact = await this.prisma.contact.findFirst({
  //       where: {
  //         id: contactId,
  //       },
  //     });
  //     if (!foundContact) {
  //       throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
  //     }
  //     let data = {
  //       title,
  //       content,
  //       metadata: metadata,
  //     };
  //     if (imageContact?.filename) {
  //       data['image'] = `/images/contacts/${imageContact.filename}`;
  //     }
  //     const updateContact = await this.prisma.contact.update({
  //       where: {
  //         id: contactId,
  //       },
  //       data,
  //     });
  //     return updateContact;
  //   } catch (error) {
  //     console.log({ updateContactError: error });
  //     return error;
  //   }
  // }

  public async getOneById(contactId: number): Promise<Contact> {
    try {
      const foundContactById = await this.prisma.contact.findFirst({
        where: {
          id: contactId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundContactById;
    } catch (error) {
      console.log({ foundContactByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(contactId: number): Promise<Contact> {
    try {
      const foundContact = await this.prisma.contact.findFirst({
        where: {
          id: contactId,
        },
      });
      if (!foundContact) {
        throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
      }

      const softDeleteContactById = await this.prisma.contact.update({
        where: {
          id: contactId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteContactById;
    } catch (error) {
      console.log({ softDeleteContactByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleContacts = await this.prisma.contact.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleContacts;
    } catch (error) {
      console.log({ softDeleteMultipleContactByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleContacts = await this.prisma.contact.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleContacts;
    } catch (error) {
      console.log({ restoreMultipleContactByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneContact(contactId: number): Promise<Contact> {
    try {
      const foundContact = await this.prisma.contact.findFirst({
        where: {
          id: contactId,
          deletedFlg: true,
        },
      });
      if (!foundContact) {
        throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
      }

      const restoreContactById = await this.prisma.contact.update({
        where: {
          id: contactId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreContactById;
    } catch (error) {
      console.log({ restoreContactByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(
    contactId: number,
    payload: IsDeleteImageDto,
  ): Promise<Contact> {
    try {
      const foundContact = await this.prisma.contact.findFirst({
        where: {
          id: contactId,
        },
      });
      if (!foundContact) {
        throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
      }

      //   if (payload?.isDeleteImage) {
      //     await fs.promises.unlink(`./src/public/${foundContact.url}`);
      //   }

      const forceDeleteContactById = await this.prisma.contact.delete({
        where: {
          id: contactId,
        },
      });
      return forceDeleteContactById;
    } catch (error) {
      console.log({ forceDeleteContactByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleContacts = await this.prisma.contact.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleContacts;
    } catch (error) {
      console.log({ softDeleteMultipleContactByIdArrayError: error });
      return error;
    }
  }
}
