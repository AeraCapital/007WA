// whatsapp/whatsapp.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappSession } from './entities/whatsapp-session.entity';
import { UserModule } from 'src/user/user.module';
import { WhatsappGateway } from './whatsapp.gateway';

@Module({
  imports: [ TypeOrmModule.forFeature([ WhatsappSession ]), UserModule ],
  controllers: [ WhatsappController ],
  providers: [ WhatsappService, WhatsappGateway ],
  exports: [ WhatsappService ],
})
export class WhatsappModule { }
