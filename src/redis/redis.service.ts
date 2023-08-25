import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
@Injectable()
export class RedisService {
  private readonly client: Redis.Redis;

  constructor() {
    // Connect to the Redis server (assuming it's running locally on the default port)
    // this.client = new Redis();
  }

  // async get(key: string): Promise<any> {
  //   const value = await this.client.get(key);
  //   return JSON.parse(value);
  // }

  // async set(key: string, value: any, ttl?: number): Promise<void> {
  //   await this.client.set(key, JSON.stringify(value));
  //   if (ttl) {
  //     await this.client.expire(key, ttl);
  //   }
  // }
}
