// whatsapp/entities/whatsapp-session.entity.ts

import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WhatsappSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('json')
    data: any;

    @OneToOne(() => User, user => user.whatsappSession)
    user: User;
}
