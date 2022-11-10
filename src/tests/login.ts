// const supertest = require('supertest');
// const app = require('../server');

// exports.loginRoute = describe('Login Route', () => {
//     let validLoginResponse, invalidLoginResponse;

//     beforeAll(async () => {
//         const validCredential = {
//             document: '56967915576',
//             password: '123456',
//         };

//         const invalidCredential = {
//             document: '0293314',
//             password: '234234234',
//         };

//         validLoginResponse = await supertest(app)
//             .post('/login')
//             .send(validCredential);

//         invalidLoginResponse = await supertest(app)
//             .post('/login')
//             .send(invalidCredential);
//     });

//     it('Endpoint /login => Should be able to Login', async () => {
//         expect(validLoginResponse.statusCode).toEqual(200);
//     });

//     it('Endpoint /login => Should not be able to Login', async () => {
//         expect(invalidLoginResponse.statusCode).toEqual(401);
//     });

//     it('Endpoint /login => Should have Bearer Auth Token response body', async () => {
//         expect(validLoginResponse.statusCode).toEqual(200);
//         expect(validLoginResponse.body).toHaveProperty('token');
//         expect(validLoginResponse.body.token).toContain('Bearer');
//     });
// });
