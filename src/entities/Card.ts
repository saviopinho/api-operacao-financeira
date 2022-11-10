import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Account } from './Account';
import { People } from './People';

@Entity('cards')
export class Card {
    @PrimaryColumn({ nullable: false, type: 'text' })
    id: string;

    @Column({ nullable: false, type: 'text' })
    type: string;

    @Column({ nullable: false, type: 'text' })
    number: string;

    @Column({ nullable: false, type: 'text' })
    cvv: string;

    @Column({ nullable: false, type: 'text' })
    document: string;

    @Column({ nullable: false, type: 'text' })
    accountId: string;

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

    @ManyToOne(() => People, (people) => people.cards)
    @JoinColumn({ name: 'document', referencedColumnName: 'document' })
    people: People;

    @ManyToOne(() => Account, (account) => account.cards)
    @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
    account: Account;
}
