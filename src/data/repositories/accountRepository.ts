import dataSource from '../data-source';
import { Account } from '../entities/Account';

export const accountRepo = dataSource.getRepository(Account);
