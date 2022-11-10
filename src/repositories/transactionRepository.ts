import dataSource from '../data-source';
import { Transaction } from '../entities/Transaction';

export const transactionRepo = dataSource.getRepository(Transaction);
