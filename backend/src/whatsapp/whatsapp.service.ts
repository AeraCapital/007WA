// whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { LocalAuth, Client as WhatsAppClient } from 'whatsapp-web.js';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { WhatsappGateway } from './whatsapp.gateway';
import { WhatsappMessages } from './entities/whatsapp-messages.entity';

@Injectable()
export class WhatsappService {
    private clients: { [ id: string ]: WhatsAppClient; } = {};

    constructor (
        @InjectRepository(WhatsappMessages)
        private whatsappMessagesRepository: Repository<WhatsappMessages>,
        private userService: UserService,
        private whatsappGateway: WhatsappGateway
    ) { }

    async createSessionForUser (userId: string) {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new Error(`User with ID "${ userId }" not found`);
        }

        const client = new WhatsAppClient({
            authStrategy: new LocalAuth({ clientId: userId }),
            puppeteer: {
                headless: true,
                args: [ '--no-sandbox' ],
                // browserWSEndpoint: process.env.BROWSER_URL,
            },
        });


        client.on('authenticated', async (data) => {
            console.log(data);

            // this.whatsappGateway.server.emit('authentication', sess);
        });

        client.on('qr', (qr) => {
            this.whatsappGateway.server.emit('qr', { sessionId: user.id, qr });
        });

        client.on('message', async msg => {
            if (msg.type == 'chat') {


                const newMessage = this.whatsappMessagesRepository.create();
                newMessage.body = msg.body;
                newMessage.from = this.cleanNumbers(msg.from);
                newMessage.to = this.cleanNumbers(msg.to);
                newMessage.messageTimestamp = msg.timestamp;
                newMessage.user = user;
                console.log(msg);
                await this.whatsappMessagesRepository.save(newMessage);

                this.whatsappGateway.server.emit('message', { sessionId: user.id, message: msg.body, from: msg.from });

                this.handleReplies(msg.from, msg.body)
            }
        });

        client.on('ready', async () => {
            console.log('Client is ready!');
            this.whatsappGateway.server.emit('ready', { status: true });

        });


        client.initialize();

        this.clients[ user.id ] = client;
    }

    getClient (id: string): WhatsAppClient {
        return this.clients[ id ];
    }

    cleanNumbers (id: string) {
        return id.split('@')[ 0 ];
    }


    handleReplies(from:string, body:string){
        
    }
    async sendMessage (sessionId: string, to: string, message: string) {
        const client = this.getClient(sessionId);

        if (client) {
            return client.sendMessage(to, message);
        }
        else {
            throw new Error('Session not found or not connected');
        }
    }

    async getMessages (id: string) {

        const user = await this.userService.findOne(id);
        return this.whatsappMessagesRepository.findBy({ user: user });
    }

}
