import { Response } from 'superagent';
import request from 'supertest';
import app from '../server';

export const loginRoute = describe('[Route: Login]', () => {
    let validLoginResponse: Response, invalidLoginResponse: Response;

    beforeAll(async () => {
        const validCredential = {
            document: '56967915576',
            password: '123456',
        };

        const invalidCredential = {
            document: '0293314',
            password: '234234234',
        };

        validLoginResponse = await request(app)
            .post('/login')
            .send(validCredential);

        invalidLoginResponse = await request(app)
            .post('/login')
            .send(invalidCredential);
    });

    it('Endpoint /login => Should be able to Login', async () => {
        expect(validLoginResponse.statusCode).toEqual(200);
    });

    it('Endpoint /login => Should not be able to Login due to invalid credentials', async () => {
        expect(invalidLoginResponse.statusCode).toEqual(401);
    });

    it('Endpoint /login => Should have Bearer Auth Token response body', async () => {
        expect(validLoginResponse.statusCode).toEqual(200);
        expect(validLoginResponse.body).toHaveProperty('token');
        expect(validLoginResponse.body.token).toContain('Bearer');
    });
});
