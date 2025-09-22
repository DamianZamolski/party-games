import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Database } from '../Database.js';
import type { Room } from './Room.js';
import type { Rooms } from './Rooms.js';

@Controller({ path: '/rooms' })
export class RoomsController {
  constructor(
    private readonly logger: Logger,
    private readonly database: Database,
  ) {}

  @Get()
  async getRooms(): Promise<Rooms> {
    this.logger.log('RoomsController#getRooms');
    const rooms = await this.database.room.findMany();
    this.logger.log('RoomsController#getRooms success', { rooms });

    return rooms;
  }

  @Post()
  async createRoom(@Body() createRoomDto: Room): Promise<Room> {
    this.logger.log('RoomsController#createRoom');

    const room = await this.database.room.create({
      data: { name: createRoomDto.name },
    });

    this.logger.log('RoomsController#createRoom success', { room });

    return room;
  }
}
