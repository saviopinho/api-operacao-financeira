import request from 'supertest';
import app from '../../src/server';

export const peopleRoute = describe('People Route', () => {
    const cpfRequestData = {
        name: 'Usuario Teste da Silva',
        document: '56967915576',
        password: '123456',
    };
    const cnpjRequestData = {
        name: 'Empresa Teste LTDA',
        document: '14121957000109',
        password: '654321',
    };

    it('Endpoint POST /people => Should be able to create new User (CPF) with API Compliance Validation', async () => {
        const res = await request(app).post('/people').send(cpfRequestData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('document');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('Endpoint POST /people => Should be able to create new User (CNPJ) with API Compliance Validation', async () => {
        const res = await request(app).post('/people').send(cnpjRequestData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('document');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    });

    it('Endpoint POST /people => Should not be able to create user with same document', async () => {
        const res = await request(app).post('/people').send(cpfRequestData);

        expect(res.statusCode).toEqual(409);
    });
});
