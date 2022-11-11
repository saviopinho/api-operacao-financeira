import { Request, Response, NextFunction } from 'express';
import { BadRequestError, UnauthorizeError } from '../helper/ApiError';
import { peopleRepo } from '../data/repositories/peopleRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Utils from '../helper/utils';

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { document, password } = req.body;
    const formatedDocument = Utils.onlyNumbers(document);

    if (!(document && password)) {
        throw new BadRequestError('All input is required');
    }

    const foundPeople = await peopleRepo.findOneBy({
        document: formatedDocument,
    });

    if (
        foundPeople &&
        (await bcrypt.compare(password, foundPeople!.password))
    ) {
        const token = jwt.sign(
            { formatedDocument },
            process.env.API_KEY ?? '',
            {
                expiresIn: '24h',
            }
        );

        res.status(200).json({ token: `Bearer ${token}` });
    } else {
        throw new UnauthorizeError('Invalid Credentials');
    }
};
