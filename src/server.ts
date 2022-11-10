import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { errorMiddleware } from './middleware/ErrorHandler';
import people from './routes/people';
import login from './routes/login';
import accounts from './routes/accounts';
import cards from './routes/cards';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

app.use('/people', people);
app.use('/login', login);
app.use('/accounts', accounts);
app.use('/cards', cards);
app.use(errorMiddleware);

export default app;
