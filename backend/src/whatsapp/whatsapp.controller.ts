// whatsapp/whatsapp.controller.ts

import { Controller, Post, Param } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('create-session/:userId')
  createSessionForUser(@Param('userId') userId: string) {
    return this.whatsappService.createSessionForUser(userId);
  }
}
