import { ConflictError } from '../helper/ApiError';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import Utils from '../helper/Utils';

class PeopleController {
    async createOne(req: Request, res: Response, next: NextFunction) {
        const { name, document, password } = req.params;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const formated_document = Utils.onlyNumbers(document);

        const people_data = {
            id: uuid(),
            name,
            document: formated_document,
            password: encryptedPassword,
        };

        const found = await db.people.findOne({
            where: { document: formated_document },
        });

        if (found) {
            throw new ConflictError('User already created');
        }

        const _people = await db.people.create(people_data);

        return res.status(201).json({
            id: _people.id,
            name: _people.name,
            document: _people.document,
            createdAt: _people.createdAt,
            updatedAt: _people.updatedAt,
        });
    }
}

export default new PeopleController();
