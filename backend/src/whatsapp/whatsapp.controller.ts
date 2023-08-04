// whatsapp/whatsapp.controller.ts

import { Controller, Post, Param, Request, UseGuards } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('whatsapp')
export class WhatsappController {
  constructor (private readonly whatsappService: WhatsappService) { }

  @Post('create-session')
  @UseGuards(JwtAuthGuard)
  createSessionForUser (@Request() request) {
    const { userId } = request;
    return this.whatsappService.createSessionForUser(userId);
  }
}
