import 'dotenv/config';
import dataSource from './src/data/data-source';
import app from '././src/server';
import { peopleRoute } from './src/tests/people';
import { loginRoute } from './src/tests/login';
import { accountsRoute } from './src/tests/accounts';
import { cardsRoute } from './src/tests/cards';
import { Account } from './src/data/entities/Account';
import { Card } from './src/data/entities/Card';
import { People } from './src/data/entities/People';
import { Transaction } from './src/data/entities/Transaction';

let connection: any, server: any;

beforeAll(async () => {
    connection = await dataSource.initialize();
    server = app.listen(process.env.EXTERNAL_PORT);

    const transRepo = dataSource.getRepository(Transaction);
    const cardRepo = dataSource.getRepository(Card);
    const accountRepo = dataSource.getRepository(Account);
    const peopleRepo = dataSource.getRepository(People);

    await peopleRepo.clear();
    await transRepo.clear();
    await cardRepo.clear();
    await accountRepo.clear();
});

afterAll(() => {
    connection.destroy();
    server.close();
});

describe('Running tests sequentially', () => {
    peopleRoute;
    loginRoute;
    accountsRoute;
    cardsRoute;
});
