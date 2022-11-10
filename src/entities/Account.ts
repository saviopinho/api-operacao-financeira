import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Card } from './Card';
import { People } from './People';
import { Transaction } from './Transaction';

@Entity('accounts')
export class Account {
    @PrimaryColumn({ nullable: false, type: 'text' })
    id: string;

    @Column({ nullable: false, type: 'text' })
    branch: string;

    @Column({ nullable: false, type: 'text' })
    account: string;

    @Column({ nullable: false, type: 'text' })
    document: string;

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

    @ManyToOne(() => People, (people) => people.accounts)
    @JoinColumn({ name: 'document', referencedColumnName: 'document' })
    people: People;

    @OneToMany(() => Card, (card) => card.account)
    cards: Card[];

    @OneToMany(() => Transaction, (transaction) => transaction.account)
    transactions: Card[];
}
