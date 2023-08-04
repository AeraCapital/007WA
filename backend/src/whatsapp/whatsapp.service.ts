// whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhatsappSession } from './entities/whatsapp-session.entity';
import { UserService } from '../user/user.service';
import { LocalAuth, Client as WhatsAppClient } from 'whatsapp-web.js';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { WhatsappGateway } from './whatsapp.gateway';

@Injectable()
export class WhatsappService {
    private clients: { [ id: string ]: WhatsAppClient; } = {};

    constructor (
        @InjectRepository(WhatsappSession)
        private whatsappSessionRepository: Repository<WhatsappSession>,
        private userService: UserService,
        private whatsappGateway: WhatsappGateway
    ) {

        // this.initializeSessions();

    }

    async createSessionForUser (userId: string) {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new Error(`User with ID "${ userId }" not found`);
        }

        let sess = new WhatsappSession();

        await this.whatsappSessionRepository.save(sess);

        const client = new WhatsAppClient({
            authStrategy: new LocalAuth({ clientId: userId }),
            puppeteer: {
                headless: true,
                args: [ '--no-sandbox' ],
                // browserWSEndpoint: process.env.BROWSER_URL,
            },
        });

        client.on('authenticated', async () => {
            sess.isActive = true;
            sess.user = user;
            await this.whatsappSessionRepository.save(sess);

            this.whatsappGateway.server.emit('authentication', sess);
        });

        client.on('qr', (qr) => {
            // Emit the QR code via WebSockets
            console.log(qr);
            this.whatsappGateway.server.emit('qr', { sessionId: sess.id, qr, userId });
        });

        client.on('message', msg => {
            console.log(msg.body);
            this.whatsappGateway.server.emit('message', { sessionId: sess.id, message: msg.body, from: msg.from });
        });


        client.initialize();

        this.clients[ sess.id ] = client;

        user.whatsappSession = sess;

        // await this.userService.updateUser(UpdateUserDto: user);
    }

    getClient (id: string): WhatsAppClient {
        return this.clients[ id ];
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

    async initializeSessions () {
        // If you need to restore sessions from the database on startup
        // You can write logic here
        const sessions = await this.whatsappSessionRepository.find({ relations: [ 'user' ] });

        for (const session of sessions) {

            const client = new WhatsAppClient({
                authStrategy: new LocalAuth({ clientId: session.user.id }),
                puppeteer: {
                    headless: true,
                    args: [ '--no-sandbox' ],
                },


            });

            // Register any needed client event handlers here
            client.on('authenticated', async () => {    
                this.whatsappGateway.server.emit('authentication', session);
            });

            client.on('message', msg => {
                console.log(msg.body);
                this.whatsappGateway.server.emit('message', { sessionId: session.id, message: msg.body, from: msg.from });
            });

            client.initialize();
            this.clients[ session.id ] = client;
        }
    }


}
