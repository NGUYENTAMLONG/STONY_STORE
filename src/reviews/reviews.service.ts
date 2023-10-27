import { Injectable } from '@nestjs/common';
import { PrismaClient, Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaClient) {}
  public async createOneReview(payload, thumbnail): Promise<any> {
    //   Review
    try {
      //   const created = await this.prisma.review.create({
      //     data: {},
      //   });
      return 'createdReview';
    } catch (error) {
      console.log({ createReviewError: error });
      return error;
    }
  }
}
