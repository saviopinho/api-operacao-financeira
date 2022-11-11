import { Response } from 'superagent';
import request from 'supertest';
import app from '../server';
import dataSource from '../data/data-source';

let loginResponse: Response;

export const cardsRoute = describe('[Route: Cards]', () => {
    const requestData = {
        document: '56967915576',
        password: '123456',
    };

    beforeAll(async () => {
        loginResponse = await request(app).post('/login').send(requestData);
    });

    it('Endpoint GET /cards => Should be able to list all user Cards with default Pagination', async () => {
        const token = loginResponse.body.token;

        const res = await request(app)
            .get('/cards')
            .set('Authorization', token);

        expect(res.statusCode).toEqual(200);

        const pagination = res.body.pagination;
        expect(pagination).toHaveProperty('itemsPerPage');
        expect(pagination).toHaveProperty('currentPage');
        expect(pagination.itemsPerPage).toEqual(10);
        expect(pagination.currentPage).toEqual(1);

        const cards = res.body.cards;
        expect(Array.isArray(cards)).toBe(true);
        expect(cards[0]).toHaveProperty('id');
        expect(cards[0]).toHaveProperty('type');
        expect(cards[0]).toHaveProperty('number');
        expect(cards[0]).toHaveProperty('cvv');
        expect(cards[0]).toHaveProperty('createdAt');
        expect(cards[0]).toHaveProperty('updatedAt');
    });
});
