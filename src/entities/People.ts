import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Account } from './Account';
import { Card } from './Card';

@Entity('people')
export class People {
    @PrimaryColumn({ nullable: false, unique: true, type: 'text' })
    id: string;

    @Column({ nullable: false, unique: true, type: 'text' })
    document: string;

    @Column({ nullable: false, type: 'text' })
    name: string;

    @Column({ nullable: false, type: 'text' })
    password: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @OneToMany(() => Account, (account) => account.people)
    accounts: Account[];

    @OneToMany(() => Card, (card) => card.people)
    cards: Card[];
}
