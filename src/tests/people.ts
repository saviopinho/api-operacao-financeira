import request from 'supertest';
import app from '../../src/server';
import 'dotenv/config';
import dataSource from '../data-source';
import { People } from '../entities/People';

export const peopleRoute = describe('People Route', () => {
    let connection: any, server: any;

    beforeAll(async () => {
        connection = await dataSource.initialize();
        server = app.listen(process.env.EXTERNAL_PORT);
    });

    afterAll(() => {
        connection.destroy();
        server.close();
    });

    // it('should bring some shit', async () => {
    //     const response = await request(app).post('/login').send({
    //         document: '02934963314',
    //         password: '12345',
    //     });
    //     const token = response.body.token;

    //     const res = await request(app)
    //         .post('/accounts')
    //         .set('Authorization', token)
    //         .send({
    //             branch: '789',
    //             account: '22223-4',
    //         });

    //     console.log('add account status:', res.statusCode);
    //     console.log('add account body:', res.body);
    // });

    it('>>>>>>>> 1', async () => {
        const response = await request(app).post('/people').send({
            name: 'Isabelle',
            document: '03758100305',
            password: '12345',
        });

        console.log('response.statusCode:', response.statusCode);
        console.log('response.body:', response.body);
    });

    it('deletou 2', async () => {
        const document = '03758100305';
        const peopleRepo = dataSource.getRepository(People);

        console.log('peopleRepo:', await peopleRepo.delete({ document }));
    });
});
