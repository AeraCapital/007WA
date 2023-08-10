// whatsapp/whatsapp.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { LocalAuth, Client } from 'whatsapp-web.js';
import { WhatsappGateway } from './whatsapp.gateway';
import { WhatsappMessages } from './entities/whatsapp-messages.entity';
import { User } from 'src/user/entities/user.entity';
import { KeywordService } from 'src/keyword/keyword.service';
import { WhatsAppAccount } from './entities/whatsapp-account.entity';

@Injectable()
export class WhatsappService {
    private clients: { [ id: string ]: Client; } = {
    };

    constructor (
        @InjectRepository(WhatsappMessages)
        private whatsappMessagesRepository: Repository<WhatsappMessages>,

        @InjectRepository(WhatsAppAccount)
        private readonly accountRepository: Repository<WhatsAppAccount>,

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

        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: user.id,
                dataPath: `/usr/src/app/user-data-dir/${ user.id }`,
            }),
            puppeteer: {
                headless: true,
                args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
                handleSIGINT: false,
                executablePath: '/usr/bin/chromium'

            },
            qrMaxRetries: 3
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

                const clientAccount = await this.getWhatsappAccountFromNumber(msg.from, user);

                const newMessage = this.whatsappMessagesRepository.create();
                newMessage.body = msg.body;
                newMessage.client = clientAccount;
                newMessage.type = 'in';
                newMessage.messageTimestamp = msg.timestamp;
                newMessage.user = user;

                await this.whatsappMessagesRepository.save(newMessage);

                this.whatsappGateway.sendDirectMessage(`${ user.id }`, { type: 'chat', data: newMessage });

                this.handleReplies(clientAccount, msg.body, user, msg.to);
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

        client.on('disconnected', async (data) => {
            console.log("client disconnected!");
            // Close the Puppeteer browser
            if (client.pupBrowser) {
                await client.pupBrowser.close();
            }

            // Update user session and send direct message
            await this.userService.updateWhatsappSession(user.id, false);
            await this.whatsappGateway.sendDirectMessage(user.id, { type: 'logout', status: true });
        });


        client.initialize().catch((e) => console.log(e));


        this.clients[ user.id ] = client;

    }

    getClient (id: string): Client {
        return this.clients[ id ];
    }

    cleanNumbers (id: string) {
        return id.split('@')[ 0 ];
    }

    wfyNumbers (id: string) {
        return id + '@c.us';
    }

    async handleReplies (client: WhatsAppAccount, body: string, user: User, to: string) {

        let reply = await this.keywordService.getReply(body);
        if (!reply) {
            reply = "I couldn't understand your query. Our customer support representative will connect with you in a moment.";
        }

        await this.sendMessage(user, client.phone, reply);
    }

    async sendMessage (user: User, to: string, message: string) {
        const client = this.getClient(user.id);

        if (user.activeWhatsappSession === true) {


            const whatsappAccount = await this.getWhatsappAccountFromNumber(to, user);

            if (client) {
                const newMessage = await this.whatsappMessagesRepository.create();
                newMessage.body = message;
                newMessage.type = 'out';
                newMessage.messageTimestamp = 12345;
                newMessage.user = user;
                newMessage.client = whatsappAccount;

                await this.whatsappMessagesRepository.save(newMessage).catch(c => console.log(c));

                this.whatsappGateway.sendDirectMessage(user.id, { type: 'chat', data: newMessage });

                return await client.sendMessage(this.wfyNumbers(to), message);
            }

            else {
                throw new NotFoundException('Session not found or not connected');
            }
        }
    }

    async getMessages (id: string, accountId) {

        const user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${ id } Not Found!`);
        }

        const account = await this.accountRepository.findOne({
            where: {
                owner: {
                    id: user.id
                },
                id: accountId
            }
        });

        if (!account) {
            throw new NotFoundException(`Acount with id ${ accountId } Not Found!`);
        }
        console.log(account);
        return await this.whatsappMessagesRepository.find({
            where: {

                user: user,
                client: account
            }
        });
    }

    async initializeAll () {
        const users = await this.userService.usersWithActiveSesssions();

        if (users.length > 0) {
            users.forEach(user => this.createSessionForUser(user.id).then(() => console.log("Initialized for user", user.id)));
        }
    }

    async createWhatsappAccount (accountData: Partial<WhatsAppAccount>): Promise<WhatsAppAccount> {
        const account = this.accountRepository.create(accountData);
        return this.accountRepository.save(account);
    }

    async getWhatsappAccountFromNumber (phone: string, owner: User): Promise<WhatsAppAccount> {
        let account = await this.accountRepository.findOne({ where: { phone: this.cleanNumbers(phone), owner: owner } });
        console.log(owner);
        if (account === null) {
            console.log("Running this");
            // Create a new record for the sender if they don't exist
            account = new WhatsAppAccount();
            account.phone = this.cleanNumbers(phone);
            account.owner = owner;
            await this.accountRepository.save(account);
        }


        return account;
    }


    async getClients (id: string) {

        return await this.accountRepository.find({
            where: {
                owner: { id: id }
            }
        });
    }
}
