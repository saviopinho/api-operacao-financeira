import supertest from 'supertest';
import app from '../server';

exports.peopleRoute = describe('People Route', () => {
    let peopleData = {
        name: 'Usuario Teste da Silva',
        document: '56967915576',
        password: '123456',
    };

    beforeAll(async () => {
        const { people } = require('../../models');

        await people.destroy({ where: { document: peopleData.document } });
    });

    it('Endpoint /people => Should be able to create new user with all response body properties requested', async () => {
        const res = await supertest(app).post('/people').send(peopleData);

        expect(res.statusCode).toEqual(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('document');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });
});
