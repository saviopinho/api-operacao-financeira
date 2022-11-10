import 'dotenv/config';
import app from './src/server';
import dataSource from './src/data-source';

const port = process.env.EXTERNAL_PORT || 3001;

dataSource.initialize().then(() => {
    return app.listen(port, () => {
        console.log('connected to port:', port);
    });
});
