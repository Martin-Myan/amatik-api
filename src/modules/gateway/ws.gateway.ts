import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsService } from './ws.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: '*', transports: ['websocket'] })
export class WsGateway implements OnGatewayInit {
  logger: Logger;

  @WebSocketServer()
  server: Server;

  constructor(private readonly wsService: WsService) {
    this.logger = new Logger(WsService.name);
  }

  afterInit() {
    this.logger.log('init socket gateway');

    this.wsService.setServer(this.server);
  }
}
