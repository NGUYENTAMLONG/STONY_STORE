import { BadRequestException, Injectable } from '@nestjs/common';
import { Post, PrismaClient, User } from '@prisma/client';
import { EXCEPTION_POST } from './constants/post.constant';
import { CreatePostDto, UpdatePostDto } from './dtos/post.dtos';
import * as fs from 'fs';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Post[]> {
    try {
      const offset = (page - 1) * limit;
      const posts = await this.prisma.post.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return posts;
    } catch (error) {
      console.log({ getPostListError: error });
      return error;
    }
  }

  public async getMyPostList(
    userReq: User,
    page: number,
    limit: number,
  ): Promise<Post[]> {
    try {
      const offset = (page - 1) * limit;
      const posts = await this.prisma.post.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
          createdBy: userReq.id,
          authorId: userReq.id,
        },
        skip: offset,
        take: limit,
      });
      return posts;
    } catch (error) {
      console.log({ getMyPostListError: error });
      return error;
    }
  }

  public async createOnePost(
    userReq: User,
    payload: CreatePostDto,
    thumbnail: Express.Multer.File,
  ): Promise<Post> {
    try {
      if (!thumbnail) {
        throw new BadRequestException(EXCEPTION_POST.DOES_NOT_HAVE_THUMBNAIL);
      }
      const { title, content, keywords, link, ...rest } = payload;

      //check
      const getDuplicateKeywords = await this.prisma.keyword.findMany({
        where: {
          value: {
            in: keywords,
          },
        },
      });
      const getMappingIdDuplicateKeywords = [];
      const getMappingDuplicateKeywords = [];
      getDuplicateKeywords.forEach((keyword) => {
        getMappingIdDuplicateKeywords.push(keyword.id);
        getMappingDuplicateKeywords.push(keyword.value);
      });
      //
      const getAnotherKeywords = keywords.filter(
        (keyword) => !getMappingDuplicateKeywords.includes(keyword) && keyword,
      );
      if (getAnotherKeywords.length > 0) {
        const mappingKeywords = keywords.map((keyword) => {
          return {
            value: keyword,
            createdBy: userReq.id,
            posts: {
              create: [
                {
                  post: {
                    connect: {
                      id: createdPost.id,
                    },
                  },
                },
              ],
            },
          };
        });

        const createdNewKeyword = await this.prisma.keyword.createMany({
          data: mappingKeywords,
        });
        // const createdNewKeywordTest = await this.prisma.keyword.create({
        //       data: {
        //         value: "ADSf",
        //         createdBy: userReq.id,
        //         posts: {
        //           create: [
        //             {
        //               post: {
        //                 connect: {
        //                   id: createdPost.id,
        //                 },
        //               },
        //             },
        //           ],
        //         },
        //       },
        //     });
      }
      const mappingConnectKeywords = getMappingIdDuplicateKeywords.map(
        (keywordId) => {
          return {
            keyword: {
              connect: {
                id: keywordId,
              },
            },
          };
        },
      );
      const createdPost = await this.prisma.post.create({
        data: {
          title,
          content,
          link,
          authorId: userReq.id,
          thumbnail: `/images/posts/thumbnails/${thumbnail.filename}`,
          ...rest,
          keywords: {
            create: mappingConnectKeywords,
          },
        },
      });
      // Category ?????
      return createdPost;
    } catch (error) {
      console.log({ createPostError: error });
      return error;
    }
  }

  public async updateOnePost(
    postId: number,
    payload: UpdatePostDto,
    thumbnail: Express.Multer.File,
  ): Promise<any> {
    try {
      if (!postId) {
        throw new BadRequestException(EXCEPTION_POST.MUST_HAVE_POST_ID);
      }

      const foundPost = await this.prisma.post.findFirst({
        where: {
          id: postId,
        },
      });

      if (!foundPost) {
        throw new BadRequestException(EXCEPTION_POST.POST_NOT_FOUND);
      }

      const { title, content, keywords, link, ...rest } = payload;
      const updatedPostData: any = {
        title,
        content,
        keywords,
        link,
        ...rest,
      };
      if (thumbnail) {
        updatedPostData.thumbnail = `/images/posts/thumbnails/${thumbnail.filename}`;
        //unlink old thumbnail
        if (foundPost.thumbnail) {
          const oldThumbnailPath = `./src/public/${foundPost.thumbnail}`;
          fs.unlink(oldThumbnailPath, (err) => {
            if (err) {
              console.error(`Error unlinking old thumbnail post: ${err}`);
              // Handle the error (e.g., respond with an error message)
            } else {
              console.log('Old thumbnail post unlinked successfully');
              // Continue with the update process
            }
          });
        }
      }
      //Keyword ??
      const updatedPost = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: updatedPostData,
      });
      return updatedPost;
    } catch (error) {
      console.log({ updatePostError: error });
      return error;
    }
  }

  public async softDeleteOne(postId: number): Promise<any> {
    try {
      const foundPost = await this.prisma.post.findFirst({
        where: {
          id: postId,
        },
      });

      if (!foundPost) {
        throw new BadRequestException(EXCEPTION_POST.POST_NOT_FOUND);
      }

      const softDeletedPost = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          deletedAt: new Date(),
          deletedFlg: true,
        },
      });
      return softDeletedPost;
    } catch (error) {
      console.log({ softDeletedError: error });
      return error;
    }
  }
  public async restoreOne(postId: number): Promise<any> {
    try {
      const foundDeletedPost = await this.prisma.post.findFirst({
        where: {
          id: postId,
          deletedFlg: true,
          deletedAt: {
            not: null,
          },
        },
      });

      if (!foundDeletedPost) {
        throw new BadRequestException(EXCEPTION_POST.DELETED_POST_NOT_FOUND);
      }
      const restorePost = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return restorePost;
    } catch (error) {
      console.log({ restoreError: error });
      return error;
    }
  }

  public async forceDeleteOne(postId: number): Promise<any> {
    try {
      // note check cascade
      const forceDeletedUser = await this.prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return forceDeletedUser;
    } catch (error) {
      console.log({ forceDeleteError: error });
      return error;
    }
  }
}
