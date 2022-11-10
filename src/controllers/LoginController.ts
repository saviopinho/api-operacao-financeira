import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { BadRequestError, UnauthorizeError } from '../helper/ApiError';

import jwt from 'jsonwebtoken';
import { people } from '../../models';

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { document, password } = req.body;

    if (!(document && password)) {
        throw new BadRequestError('All input is required');
    }

    const _people = await people.findOne({ where: { document } });

    if (_people && (await bcrypt.compare(password, _people.password))) {
        const token = jwt.sign({ document }, process.env.API_KEY ?? '', {
            expiresIn: '24h',
        });

        _people.token = token;

        res.status(200).json({ token: `Bearer ${token}` });
    } else {
        throw new UnauthorizeError('Invalid Credentials');
    }
};
