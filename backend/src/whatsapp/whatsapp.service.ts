// whatsapp/whatsapp.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
import { WhatsappSession } from './entities/whatsapp-session.entity';
import { UserService } from '../user/user.service';
import { Client as WhatsAppClient } from 'whatsapp-web.js';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';

@Injectable()
export class WhatsappService {
    private clients: { [ id: string ]: WhatsAppClient; } = {};
    private server: Server;

    constructor (
        @InjectRepository(WhatsappSession)
        private whatsappSessionRepository: Repository<WhatsappSession>,
        private userService: UserService,
    ) { }

    initializeServer (server: Server) {
        this.server = server;
    }

    async createSessionForUser (userId: string) {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new Error(`User with ID "${ userId }" not found`);
        }

        const session = new WhatsappSession();
        await this.whatsappSessionRepository.save(session);

        const client = new WhatsAppClient({
            puppeteer: {
                headless: false,
                args: [ '--no-sandbox' ],
                // browserWSEndpoint: process.env.BROWSER_URL,
            }
        });

        client.on('authenticated', async (sessionData) => {
            session.data = sessionData;
            await this.whatsappSessionRepository.save(session);
        });

        client.on('qr', (qr) => {
            // Emit the QR code via WebSockets
            this.server.emit('qr', { sessionId: session.id, qr, userId });
        });

        client.initialize();

        this.clients[ session.id ] = client;

        user.whatsappSession = session;
        console.log(user)
        // await this.userService.updateUser(UpdateUserDto: user);
    }

    getClient (id: string): WhatsAppClient {
        return this.clients[ id ];
    }

    async initializeSessions () {
        // If you need to restore sessions from the database on startup
        // You can write logic here
    }
}
