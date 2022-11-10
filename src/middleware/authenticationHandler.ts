import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
    UnauthorizeError,
    ForbiddenError,
    NotFoundError,
} from '../helper/ApiError';

interface decodedObject {
    document: string;
}
class AuthenticationHandler {
    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new ForbiddenError('A token is required for authentication');
        }

        let document = '';

        try {
            const decode = jwt.verify(
                token,
                process.env.API_KEY!
            ) as decodedObject;
            document = decode.document;
        } catch (error) {
            throw new UnauthorizeError('Invalid Token');
        }

        const _people = await db.people.findOne({ where: { document } });

        if (!_people) {
            throw new NotFoundError(
                'Invalid Token. Token belongs to an User who was not found'
            );
        }

        req.body.document = document;
        next();
    };
}

export default new AuthenticationHandler();
