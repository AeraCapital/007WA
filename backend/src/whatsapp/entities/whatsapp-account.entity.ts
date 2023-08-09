// src/entities/whatsapp-account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { WhatsappMessages } from './whatsapp-messages.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('whatsapp_accounts')
export class WhatsAppAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 20 })
    phone: string;

    @Column({ length: 100, nullable: true })
    name: string;

    @OneToMany(() => WhatsappMessages, (message) => message.client)
    messages: WhatsappMessages[];

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn()
    owner; User;

}
