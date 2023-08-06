// whatsapp.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class WhatsappGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WhatsappGateway');

  @SubscribeMessage('msgToServer')
  handleMessage (client: Socket, text: string): void {
    console.log(text);
  }

  afterInit (server: Server): void {
    this.logger.log('Socket.io server initialized');
  }

  handleConnection (client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${ client.id }`);
  }

  handleDisconnect (client: Socket): void {
    this.logger.log(`Client disconnected: ${ client.id }`);
  }
}
