// whatsapp/entities/whatsapp-session.entity.ts

import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WhatsappSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isActive: boolean;


    @OneToOne(() => User, user => user.whatsappSession)
    user: User;
}
