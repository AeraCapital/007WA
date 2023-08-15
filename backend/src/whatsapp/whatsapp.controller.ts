// whatsapp/whatsapp.controller.ts

import { Controller, Post, Param, Request, UseGuards, Get, ConflictException, NotFoundException, HttpException, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HTTP_STATUS } from 'src/common/constants/status';
import { SendMessageDto } from './dto/sendMessage.dto';
import { UserService } from 'src/user/user.service';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor (
    private readonly whatsappService: WhatsappService,
    private readonly userService: UserService
  ) { }

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
      console.log(err);
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

  @Post('send_message/')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async sendMessage (@Body() sendMessageDto: SendMessageDto, @Request() request) {
    try {
      const { id } = request.user;

      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${ id } not found!`);
      }
      const clientAccount = await this.whatsappService.getWhatsappAccountFromNumber(sendMessageDto.id, user);
      const data = await this.whatsappService.sendMessage(user, clientAccount, sendMessageDto.text);
      return { statusCode: HTTP_STATUS.OK };

    } catch (err) {

      if (err instanceof ConflictException) {
        throw new NotFoundException({ statusCode: err.getStatus(), message: err.message });

      }

      if (err instanceof NotFoundException) {
        throw new NotFoundException({ statusCode: HTTP_STATUS.NOT_FOUND, message: err.message });
      }
      console.log(err);
      throw new HttpException({ statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: 'Unexpected error!' }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/admin/contacts')
  @UseGuards(JwtAuthGuard)
  async agentsWithContacts () {
    try {
      const data = await this.whatsappService.getAgentsAndContacts();
      return { statusCode: HTTP_STATUS.OK, data };
    } catch (err) {
      if (err instanceof ConflictException) {
        throw new NotFoundException({ statusCode: err.getStatus(), message: err.message });

      }

      if (err instanceof NotFoundException) {
        throw new NotFoundException({ statusCode: HTTP_STATUS.NOT_FOUND, message: err.message });
      }
      console.log(err);
      throw new HttpException({ statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: 'Unexpected error!' }, HTTP_STATUS.INTERNAL_SERVER_ERROR);

    }
  }

  @Get('/agent/messages/:agentId/:whatsappAccountId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAgentMessages (@Param('agentId') agentId: string, @Param('whatsappAccountId') whatsappAccountId: string) {
    try {
      const data = await this.whatsappService.getAgentMessages(agentId, whatsappAccountId);
      return { statusCode: HTTP_STATUS.OK, data };

    } catch (err) {
      if (err instanceof ConflictException) {
        throw new NotFoundException({ statusCode: err.getStatus(), message: err.message });

      }

      if (err instanceof NotFoundException) {
        throw new NotFoundException({ statusCode: HTTP_STATUS.NOT_FOUND, message: err.message });
      }
      console.log(err);
      throw new HttpException({ statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: 'Unexpected error!' }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

  }

  @Post('autopilot/:accountId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAccountAutopilot (@Param('accountId') accountId: string, @Request() request, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      const { id } = request.user;

      const data = await this.whatsappService.updateAutopilot(id, accountId, updateAccountDto.status);

      return { statusCode: HTTP_STATUS.OK, data };

    } catch (err) {
      if (err instanceof ConflictException) {
        throw new NotFoundException({ statusCode: err.getStatus(), message: err.message });

      }

      if (err instanceof NotFoundException) {
        throw new NotFoundException({ statusCode: HTTP_STATUS.NOT_FOUND, message: err.message });
      }
      console.log(err);
      throw new HttpException({ statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: 'Unexpected error!' }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }
}
