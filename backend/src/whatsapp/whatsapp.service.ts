// whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { LocalAuth, Client as WhatsAppClient } from 'whatsapp-web.js';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { WhatsappGateway } from './whatsapp.gateway';
import { WhatsappMessages } from './entities/whatsapp-messages.entity';
import { User } from 'src/user/entities/user.entity';
import { KeywordService } from 'src/keyword/keyword.service';

@Injectable()
export class WhatsappService {
    private clients: { [ id: string ]: WhatsAppClient; } = {
    };

    constructor (
        @InjectRepository(WhatsappMessages)
        private whatsappMessagesRepository: Repository<WhatsappMessages>,
        private userService: UserService,
        private whatsappGateway: WhatsappGateway,
        private keywordService: KeywordService
    ) {
        this.initializeAll();
    }

    async createSessionForUser (userId: string) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new Error(`User with ID "${ userId }" not found`);
        }

        const client = new WhatsAppClient({
            authStrategy: new LocalAuth({ clientId: user.id }),
            puppeteer: {
                headless: true,
                args: [ '--no-sandbox' ],
                browserWSEndpoint: process.env.BROWSER_URL,
            },
        });

        client.on('authenticated', async (data) => {
            this.whatsappGateway.server.emit('authentication', { success: true });
        });

        client.on('qr', (qr) => {
            console.log(qr);
            this.userService.updateWhatsappSession(user.id, false);
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

                await this.whatsappMessagesRepository.save(newMessage);

                this.whatsappGateway.server.emit(`${ user.id }_message`, newMessage);

                this.handleReplies(msg.from, msg.body, user, msg.to);
            }
        });

        client.on('ready', async () => {
            console.log('Client is ready!');

            this.userService.updateWhatsappSession(user.id, true);
            this.whatsappGateway.server.emit('ready', { status: true });

        });

        client.on('auth_failure', async () => {
            console.log("Authentication Failed!");
            this.userService.updateWhatsappSession(user.id, false);

            this.whatsappGateway.server.emit('authentication', { success: false });
        });

        client.initialize().catch((e) => console.log(e));


        this.clients[ user.id ] = client;
    }

    getClient (id: string): WhatsAppClient {
        return this.clients[ id ];
    }

    cleanNumbers (id: string) {
        return id.split('@')[ 0 ];
    }


    async handleReplies (from: string, body: string, user: User, to: string) {

        let reply = await this.keywordService.getReply(body);
        if (!reply) {
            reply = "I couldn't understand your query. Our customer support representative will connect with you in a moment.";
        }
        this.sendMessage(user.id, from, reply);

        const newMessage = await this.whatsappMessagesRepository.create();
        newMessage.body = reply;
        newMessage.from = this.cleanNumbers(to);
        newMessage.to = this.cleanNumbers(from);
        newMessage.messageTimestamp = 1;
        newMessage.user = user;

        await this.whatsappMessagesRepository.save(newMessage);
        this.whatsappGateway.server.emit(`${ user.id }_autoreply`, newMessage);

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

    async initializeAll () {
        const users = await this.userService.usersWithActiveSesssions();

        if (users.length > 0) {
            users.forEach(user => this.createSessionForUser(user.id).then(() => console.log("Initialized for user", user.id)));
        }
    }
}
