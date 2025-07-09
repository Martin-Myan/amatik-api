import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { EVENTS } from './events';

@Injectable()
export class WsService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  emitToAll(event: EVENTS, data: any) {
    this.server.emit(event, data);
  }
}
