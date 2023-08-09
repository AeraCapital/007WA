// whatsapp/whatsapp.controller.ts

import { Controller, Post, Param, Request, UseGuards, Get, ConflictException, NotFoundException, HttpException } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/common/constants/status';

@Controller('whatsapp')
export class WhatsappController {
  constructor (private readonly whatsappService: WhatsappService) { }

  @Post('create-session')
  @UseGuards(JwtAuthGuard)
  createSessionForUser (@Request() request) {
    const { id } = request.user;

    return this.whatsappService.createSessionForUser(id);
  }

  @Get('messages/:accountId')
  @UseGuards(JwtAuthGuard)
  async getMessages (@Request() request, @Param('accountId') accountId: string) {
    try {
      const { id } = request.user;

      const data = await this.whatsappService.getMessages(id, accountId);

      return { statusCode: HTTP_STATUS.OK, data };
      
    } catch (err) {

      if (err instanceof ConflictException) {
        throw new NotFoundException({ statusCode: err.getStatus(), message: err.message });

      }

      if (err instanceof NotFoundException) {
        throw new NotFoundException({ statusCode: HTTP_STATUS.NOT_FOUND, message: err.message });
      }
      console.log(err)
      throw new HttpException({ statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: 'Unexpected error!' }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }


  }

  @Get('contacts')
  @UseGuards(JwtAuthGuard)
  async getContacts (@Request() request) {
    try {
      const { id } = request.user;

      const data = await this.whatsappService.getClients(id);
      return { statusCode: HTTP_STATUS.OK, data };
    } catch (err) {

      if (err instanceof ConflictException) {
        throw new NotFoundException({ statusCode: err.getStatus(), message: err.message });

      }

      if (err instanceof NotFoundException) {
        throw new NotFoundException({ statusCode: HTTP_STATUS.NOT_FOUND, message: err.message });
      }

      throw new HttpException({ statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: 'Unexpected error!' }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

  }
}
