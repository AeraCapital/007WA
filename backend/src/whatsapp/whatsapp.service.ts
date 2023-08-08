// whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { LocalAuth, Client } from 'whatsapp-web.js';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { WhatsappGateway } from './whatsapp.gateway';
import { WhatsappMessages } from './entities/whatsapp-messages.entity';
import { User } from 'src/user/entities/user.entity';
import { KeywordService } from 'src/keyword/keyword.service';

@Injectable()
export class WhatsappService {
    private clients: { [ id: string ]: Client; } = {
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

        console.log("Printing clients\n\n\n")
        console.log(this.clients)
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new Error(`User with ID "${ userId }" not found`);
        }

        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: user.id,
                dataPath: `/usr/src/app/user-data-dir/${ user.id }`,
            }),
            puppeteer: {
                headless: true,
                args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
                handleSIGINT: false,
                executablePath:'/usr/bin/chromium'

            },
        });

        client.on('authenticated', async (data) => {
            this.whatsappGateway.sendDirectMessage(user.id, { type: 'authentication', success: true });
        });

        client.on('qr', (qr) => {
            console.log(qr);
            this.userService.updateWhatsappSession(user.id, false);
            this.whatsappGateway.sendDirectMessage(user.id, { type: 'qr', sessionId: user.id, qr });
        });

        client.on('message', async msg => {

            if (msg.type == 'chat') {
                console.log(msg.body)
                console.log(user.id)
                const newMessage = this.whatsappMessagesRepository.create();
                newMessage.body = msg.body;
                newMessage.from = this.cleanNumbers(msg.from);
                newMessage.to = this.cleanNumbers(msg.to);
                newMessage.messageTimestamp = msg.timestamp;
                newMessage.user = user;

                await this.whatsappMessagesRepository.save(newMessage);

                this.whatsappGateway.sendDirectMessage(`${ user.id }`, { type: 'chat', newMessage });

                this.handleReplies(msg.from, msg.body, user, msg.to);
            }
        });

        client.on('ready', async () => {
            console.log('Client is ready!');

            this.userService.updateWhatsappSession(user.id, true);
            this.whatsappGateway.sendDirectMessage(user.id, { type: 'ready', success: true });


        });

        client.on('auth_failure', async () => {
            console.log("Authentication Failed!");
            this.userService.updateWhatsappSession(user.id, false);

            this.whatsappGateway.sendDirectMessage(user.id, { type: 'authentication', success: false });
        });

        client.initialize().catch((e) => console.log(e));


        this.clients[ user.id ] = client;
        console.log(this.clients)
    }

    getClient (id: string): Client {
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
        this.whatsappGateway.sendDirectMessage(user.id, { type: 'chat', data: newMessage });

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
