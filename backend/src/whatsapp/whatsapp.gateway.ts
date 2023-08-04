// whatsapp/whatsapp.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WhatsappService } from './whatsapp.service';

@WebSocketGateway()
export class WhatsappGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(private whatsappService: WhatsappService) {}

  afterInit() {
    this.whatsappService.initializeServer(this.server);
  }
}
