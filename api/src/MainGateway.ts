import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms/RoomsService.js';
import { createRoomInputSchema } from './rooms/createRoomInputSchema.js';
import { startMatchInputSchema } from './rooms/startMatchInputSchema.js';

@WebSocketGateway({ cors: true })
export class MainGateway {
  constructor(private roomsService: RoomsService) {}

  private readonly logger = new Logger(MainGateway.name);

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('createRoom')
  async createRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() input: unknown,
  ) {
    this.logger.log(input, 'createRoom');

    try {
      const result = await this.roomsService.createRoom(
        createRoomInputSchema.parse(input),
      );

      socket.emit('createRoom:success', result);
      this.logger.log({ input }, 'createRoom:success');
    } catch (error: unknown) {
      this.logger.error({ input, error }, 'createRoom:error');
      socket.emit('error', error);
    }
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() input: unknown,
  ) {
    this.logger.log(input, 'joinRoom');

    try {
      const parsedInput = createRoomInputSchema.parse(input);
      const result = await this.roomsService.joinRoom(parsedInput);
      await socket.join(parsedInput.roomName);
      this.server.to(parsedInput.roomName).emit('updateRoom', result);
      this.logger.log({ input, result }, 'joinRoom:success');
    } catch (error: unknown) {
      this.logger.error({ input, error }, 'joinRoom:error');
      socket.emit('error', error);
    }
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() input: { roomId: string },
  ) {
    this.logger.log({ input }, 'leaveRoom');
    await socket.leave(input.roomId);
    this.logger.log({ input }, 'leaveRoom:success');
  }

  @SubscribeMessage('startMatch')
  async startMatch(
    @ConnectedSocket() socket: Socket,
    @MessageBody() input: unknown,
  ) {
    try {
      this.logger.log({ input }, 'startMatch');
      await this.roomsService.startMatch(startMatchInputSchema.parse(input));
      socket.emit('startMatch:response');
      this.logger.log({ input }, 'startMatch:success');
    } catch (error: unknown) {
      this.logger.log({ input, error }, 'startMatch:error');
      socket.emit('error', { error });
    }
  }
}
