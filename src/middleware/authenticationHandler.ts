import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
    UnauthorizeError,
    ForbiddenError,
    NotFoundError,
} from '../helper/ApiError';
import { peopleRepo } from '../data/repositories/peopleRepository';

interface decodedObject {
    document: string;
}

class AuthenticationHandler {
    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;

        const token = authorization!.split(' ')[1];

        if (!token) {
            throw new ForbiddenError('A token is required for authentication');
        }

        let document = '';

        try {
            const decoded = jwt.verify(
                token,
                process.env.API_KEY ?? ''
            ) as decodedObject;

            document = decoded.document;
        } catch (error) {
            throw new UnauthorizeError('Invalid Token');
        }

        const foundPeople = await peopleRepo.findOneBy({ document });

        if (!foundPeople) {
            throw new NotFoundError(
                'Invalid Token. Token belongs to an User who was not found'
            );
        }

        req.body.document = document;

        next();
    };
}

export default new AuthenticationHandler();
