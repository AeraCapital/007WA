// whatsapp/entities/whatsapp-session.entity.ts

import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WhatsappMessages {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    body: string

    @Column()
    from: string
    
    @Column()
    to: string

    @Column()
    messageTimestamp: number

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
}
