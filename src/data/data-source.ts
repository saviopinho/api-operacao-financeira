import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});

export default dataSource;
