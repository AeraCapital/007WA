// whatsapp/whatsapp.controller.ts

import { Controller, Post, Param, Request, UseGuards, Get } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('whatsapp')
export class WhatsappController {
  constructor (private readonly whatsappService: WhatsappService) { }

  @Post('create-session')
  @UseGuards(JwtAuthGuard)
  createSessionForUser (@Request() request) {
    const { id } = request.user;

    return this.whatsappService.createSessionForUser(id);
  }

  @Get('messages')
  @UseGuards(JwtAuthGuard)
  getMessages (@Request() request) {
    const { userId } = request.user;
    return this.whatsappService.getMessages(userId);
  }
}
