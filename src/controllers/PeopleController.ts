import { Request, Response, NextFunction } from 'express';
import { ConflictError } from '../helper/ApiError';
import { peopleRepo } from '../data/repositories/peopleRepository';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import Utils from '../helper/utils';

class PeopleController {
    async createOne(req: Request, res: Response, next: NextFunction) {
        const { name, document, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const formated_document = Utils.onlyNumbers(document);

        const people_data = {
            id: uuid(),
            name,
            document: formated_document,
            password: encryptedPassword,
        };

        const found = await peopleRepo.findOneBy({
            document: formated_document,
        });

        if (found) {
            throw new ConflictError('User already created');
        }

        const newPeople = peopleRepo.create(people_data);
        await peopleRepo.save(newPeople);

        return res.status(201).json({
            id: newPeople.id,
            name: newPeople.name,
            document: newPeople.document,
            createdAt: newPeople.createdAt,
            updatedAt: newPeople.updatedAt,
        });
    }
}

export default new PeopleController();
