import { Response } from 'superagent';
import request from 'supertest';
import app from '../server';
import dataSource from '../data/data-source';
import { Account } from '../data/entities/Account';
import { Card } from '../data/entities/Card';

let loginResponse: Response;

export const accountsRoute = describe('[Route: Accounts]', () => {
    const requestData = {
        document: '56967915576',
        password: '123456',
    };
    const firstAccountRequest = {
        branch: '001',
        account: '2033392-5',
    };
    const secondAccountRequest = {
        branch: '452',
        account: '678452-2',
    };
    const firstCardRequest = {
        type: 'physical',
        number: '3453 1234 6785 8906',
        cvv: '654',
    };
    const secondCardRequest = {
        type: 'physical',
        number: '1234 4563 1234 6785',
        cvv: '654',
    };
    const creditRequest = {
        value: 120.0,
        description: 'Venda de conhecimento para o mundo',
    };
    const debtRequest = {
        value: -100.0,
        description: 'Compra de conhecimento para si',
    };

    beforeAll(async () => {
        loginResponse = await request(app).post('/login').send(requestData);
    });

    let firstAccount: {
        id: string;
    };

    let secondAccount: {
        id: string;
    };

    it('Endpoint POST /accounts => Should be able to create a first account', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post('/accounts')
            .set('Authorization', token)
            .send(firstAccountRequest);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('branch');
        expect(res.body).toHaveProperty('account');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');

        firstAccount = res.body;
    });

    it('Endpoint POST /accounts => Should not be able to create account with same number', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post('/accounts')
            .set('Authorization', token)
            .send(firstAccountRequest);

        expect(res.statusCode).toEqual(409);
    });

    it('Endpoint POST /accounts => Property branch should have 3 digits only', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post('/accounts')
            .set('Authorization', token)
            .send({
                branch: '1',
                account: '2033392-5',
            });

        expect(res.statusCode).toEqual(400);
    });

    it('Endpoint POST /accounts => Property account should have this mask: XXXXXXX-X', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post('/accounts')
            .set('Authorization', token)
            .send({
                branch: '123',
                account: '203335',
            });

        expect(res.statusCode).toEqual(400);
    });

    it('Endpoint POST /accounts => Should be able to create a second account', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post('/accounts')
            .set('Authorization', token)
            .send(secondAccountRequest);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('branch');
        expect(res.body).toHaveProperty('account');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');

        secondAccount = res.body;
    });

    it('Endpoint POST /accounts => Should Not be able to create same account', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post('/accounts')
            .set('Authorization', token)
            .send(firstAccountRequest);

        expect(res.statusCode).toEqual(409);
    });

    it('Endpoint GET  /accounts => Should be able to list all user Accounts', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .get('/accounts')
            .set('Authorization', token);

        expect(res.statusCode).toEqual(200);

        const accounts = res.body;

        expect(Array.isArray(accounts)).toBe(true);
        expect(accounts[0]).toHaveProperty('id');
        expect(accounts[0]).toHaveProperty('branch');
        expect(accounts[0]).toHaveProperty('account');
        expect(accounts[0]).toHaveProperty('createdAt');
        expect(accounts[0]).toHaveProperty('updatedAt');
    });

    it('Endpoint POST /accounts/:accountId/cards => Should be able create a Card', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/cards`)
            .set('Authorization', token)
            .send(firstCardRequest);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('type');
        expect(res.body).toHaveProperty('number');
        expect(res.body).toHaveProperty('cvv');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('Endpoint POST /accounts/:accountId/cards => Should not be able create more than one physical card', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/cards`)
            .set('Authorization', token)
            .send(secondCardRequest);

        expect(res.statusCode).toEqual(400);
    });

    it('Endpoint POST /accounts/:accountId/cards => Property cvv should not have less than 3 digits', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/cards`)
            .set('Authorization', token)
            .send({
                type: 'physical',
                number: '6784 1234 7895 1234',
                cvv: '12',
            });

        expect(res.statusCode).toEqual(400);
    });

    it('Endpoint POST /accounts/:accountId/cards => Property type cannot be other than [virtual, physical]', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/cards`)
            .set('Authorization', token)
            .send({
                type: 'ajkhsdajkhsd',
                number: '6784 1234 7895 1234',
                cvv: '12',
            });

        expect(res.statusCode).toEqual(400);
    });

    it('Endpoint GET  /accounts/:accountId/cards => Should be able to list all account Cards', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .get(`/accounts/${firstAccount.id}/cards`)
            .set('Authorization', token);

        expect(res.statusCode).toEqual(200);

        const cards = res.body;

        expect(Array.isArray(cards)).toBe(true);
        expect(cards[0]).toHaveProperty('id');
        expect(cards[0]).toHaveProperty('type');
        expect(cards[0]).toHaveProperty('number');
        expect(cards[0]).toHaveProperty('cvv');
        expect(cards[0]).toHaveProperty('createdAt');
        expect(cards[0]).toHaveProperty('updatedAt');
    });

    let creditReversableTransaction: {
        id: string;
    };

    let debtReversableTransaction: {
        id: string;
    };

    it('Endpoint POST /accounts/:accountId/transactions => Should be able create a Credit Transaction', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/transactions`)
            .set('Authorization', token)
            .send(creditRequest);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('value');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');

        creditReversableTransaction = res.body;
    });

    it('Endpoint POST /accounts/:accountId/transactions => Should be able create a Debt Transaction', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/transactions`)
            .set('Authorization', token)
            .send(debtRequest);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('value');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');

        debtReversableTransaction = res.body;
    });

    it('Endpoint POST /accounts/:accountId/transactions => Should not be able to create a Debt Transaction due to negative balance', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/transactions`)
            .set('Authorization', token)
            .send(debtRequest);

        expect(res.statusCode).toEqual(401);
    });

    it('Endpoint POST /accounts/:accountId/transactions/internal => Should be able to transfer to another account', async () => {
        const token = loginResponse.body.token;

        const internalTransferRequest = {
            receiverAccountId: secondAccount.id,
            value: 15.23,
            description: 'Compra teu curso da Allura. Conhecimento é poder.',
        };

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/transactions/internal`)
            .set('Authorization', token)
            .send(internalTransferRequest);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('value');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('Endpoint POST /accounts/:accountId/transactions/internal => Should not be able to transfer to another account due to negative balance', async () => {
        const token = loginResponse.body.token;

        const internalTransferRequest = {
            receiverAccountId: secondAccount.id,
            value: 15.23,
            description: 'Saldo Negativo',
        };

        const res = await request(app)
            .post(`/accounts/${firstAccount.id}/transactions/internal`)
            .set('Authorization', token)
            .send(internalTransferRequest);

        expect(res.statusCode).toEqual(401);
    });

    it('Endpoint GET  /accounts/:accountId/transactions => Should be able to list all account Transactions with default Pagination', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .get(`/accounts/${firstAccount.id}/transactions`)
            .set('Authorization', token);

        expect(res.statusCode).toEqual(200);

        const pagination = res.body.pagination;
        expect(pagination).toHaveProperty('itemsPerPage');
        expect(pagination).toHaveProperty('currentPage');
        expect(pagination.itemsPerPage).toEqual(10);
        expect(pagination.currentPage).toEqual(1);

        const transactions = res.body.transactions;
        expect(Array.isArray(transactions)).toBe(true);
        expect(transactions[0]).toHaveProperty('id');
        expect(transactions[0]).toHaveProperty('value');
        expect(transactions[0]).toHaveProperty('description');
        expect(transactions[0]).toHaveProperty('createdAt');
        expect(transactions[0]).toHaveProperty('updatedAt');
    });

    it('Endpoint GET  /accounts/:accountId/balance => Should be able to return balance = 4.77', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .get(`/accounts/${firstAccount.id}/balance`)
            .set('Authorization', token);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('balance');
        expect(res.body.balance).toEqual(4.77);
    });

    it('Endpoint POST /accounts/:accountId/transactions/:transactionId/revert => Should be able to revert a debt transaction', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(
                `/accounts/${firstAccount.id}/transactions/${debtReversableTransaction.id}/revert`
            )
            .set('Authorization', token);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('value');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('Endpoint POST /accounts/:accountId/transactions/:transactionId/revert => Should not be able to revert the same transaction', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(
                `/accounts/${firstAccount.id}/transactions/${debtReversableTransaction.id}/revert`
            )
            .set('Authorization', token);

        expect(res.statusCode).toEqual(401);
    });

    it('Endpoint GET  /accounts/:accountId/balance => After the revert, the account balance should be equal to = 104.77', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .get(`/accounts/${firstAccount.id}/balance`)
            .set('Authorization', token);

        expect(res.statusCode).toEqual(200);
        expect(res.body.balance).toEqual(104.77);
    });

    it('Endpoint POST /accounts/:accountId/transactions/:transactionId/revert => Should not be able to revert a credit transaction due to a negative balance', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .post(
                `/accounts/${firstAccount.id}/transactions/${creditReversableTransaction.id}/revert`
            )
            .set('Authorization', token);

        expect(res.statusCode).toEqual(401);
    });
});
