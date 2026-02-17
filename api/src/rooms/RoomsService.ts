import { Injectable, Logger } from '@nestjs/common';
import type { CreateRoomInput } from './CreateRoomInput.js';
import { PrismaService } from '../PrismaService.js';
import type { StartMatchInput } from './StartMatchInput.js';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createRoom(input: CreateRoomInput) {
    this.logger.log(input, 'createRoom');
    const { roomName, userId } = input;

    const room = await this.prisma.room.create({
      data: {
        name: roomName,
        users: {
          create: {
            user: {
              connectOrCreate: {
                where: { id: userId },
                create: { id: userId },
              },
            },
            isAdmin: true,
          },
        },
      },
    });

    const result = { url: `/rooms/${room.name}` };
    this.logger.log({ input, result }, 'createRoom:success');

    return result;
  }

  async joinRoom(input: CreateRoomInput) {
    this.logger.log(input, 'joinRoom');
    const { roomName, userId } = input;

    const room = await this.prisma.room.update({
      where: { name: roomName },
      data: {
        users: {
          connectOrCreate: {
            where: {
              roomName_userId: { roomName, userId },
            },
            create: {
              user: {
                connectOrCreate: {
                  where: { id: userId },
                  create: { id: userId },
                },
              },
            },
          },
        },
      },
      include: { users: true },
    });

    const result = {
      users: room.users.map((user) => ({
        id: user.userId,
        isAdmin: user.isAdmin,
      })),
    };

    this.logger.log({ input, result }, 'joinRoom:success');

    return result;
  }

  async startMatch(input: StartMatchInput) {
    this.logger.log({ input }, 'startMatch');
    const { roomName, userId } = input;

    const room = await this.prisma.room.findFirst({
      where: { name: roomName },
      include: { users: true },
    });

    const adminIds = room?.users
      .filter((user) => user.isAdmin)
      .map((user) => user.userId);

    if (!adminIds?.includes(userId)) {
      throw new Error('only admin can start a match');
    }

    this.logger.log({ input }, 'startMatch:success');
  }
}
