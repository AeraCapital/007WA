import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Keyword {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    keyword: string;

    @Column({ type: 'text' })
    reply: string;    
}
