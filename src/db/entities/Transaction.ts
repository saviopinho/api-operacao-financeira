import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Account } from './Account';

@Entity('transactions')
export class Transaction {
    @PrimaryColumn({ nullable: false, type: 'text' })
    id: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    value: number;

    @Column({ nullable: false, type: 'text' })
    description: string;

    @Column({ nullable: false, type: 'text' })
    accountId: string;

    @Column({ nullable: false, type: 'timestamptz' })
    reversedAt: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @ManyToOne(() => Account, (account) => account.transactions)
    @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
    account: Account;
}
