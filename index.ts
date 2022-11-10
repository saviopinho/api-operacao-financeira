import dotenv from 'dotenv/config';
import app from './src/server';
import db from './src/db/dataSource';

const port = process.env.EXTERNAL_PORT || 3001;

db.initialize().then(() => {
    return app.listen(port, () => {
        console.log('connected to port:', port);
    });
});
