import { Injectable, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../prisma/client/index.js';

@Injectable()
export class Database extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
