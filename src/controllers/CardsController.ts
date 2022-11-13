import { Request, Response, NextFunction } from 'express';
import { BadRequestError, ConflictError } from '../helper/ApiError';
import { cardRepo } from '../data/repositories/cardRepository';
import { Card } from '../data/entities/Card';
import { v4 as uuid } from 'uuid';

class CardsController {
    async fetchAccountCards(req: Request, res: Response, next: NextFunction) {
        const { document } = req.body;
        const { accountId } = req.params;
        const foundCards = await cardRepo.find({
            where: { document, accountId },
        });

        const responseData = foundCards.map((el: Card) => {
            return {
                id: el.id,
                type: el.type,
                number: el.number,
                cvv: el.cvv,
                createdAt: el.createdAt,
                updatedAt: el.updatedAt,
            };
        });

        return res.status(200).send(responseData);
    }

    async postPeopleCards(req: Request, res: Response, next: NextFunction) {
        try {
            const { document } = req.body;
            const foundCards = await cardRepo.find({ where: { document } });

            const responseData = foundCards.map((el: Card) => {
                return {
                    id: el.id,
                    type: el.type,
                    number: el.number.slice(-4),
                    cvv: el.cvv,
                    createdAt: el.createdAt,
                    updatedAt: el.updatedAt,
                };
            });

            req.body.list = responseData;
            req.body.title = 'cards';

            next();
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        const { document } = req.body;
        const { accountId } = req.params;
        const { type, number, cvv } = req.body;
        const lastNumbers = number.slice(-4);

        if (!(type && number && cvv)) {
            throw new BadRequestError('All input is required');
        }

        if (number.length !== 19) {
            throw new BadRequestError(
                'Invalid card number format. Valid format is: XXXX XXXX XXXX XXXX'
            );
        }

        if (cvv.length !== 3) {
            throw new BadRequestError('CVV number must have 3 digits');
        }

        if (type !== 'physical' && type !== 'virtual') {
            throw new BadRequestError(
                'Invalid Type. It must be: physical or virtual.'
            );
        }

        const foundCard = await cardRepo.findOneBy({ number });

        if (foundCard) {
            throw new ConflictError('Card already created');
        }

        if (type == 'physical') {
            const physicalCards = await cardRepo.count({
                where: {
                    accountId,
                    type: 'physical',
                },
            });

            if (physicalCards > 0) {
                throw new BadRequestError(
                    'Only one physical card is allowed per account.'
                );
            }
        }

        const card_data = {
            id: uuid(),
            type,
            number,
            cvv,
            accountId,
            document,
        };

        const newCard = cardRepo.create(card_data);

        await cardRepo.save(newCard);

        const responseData = {
            id: newCard.id,
            type: newCard.type,
            number: lastNumbers,
            cvv: newCard.cvv,
            createdAt: newCard.createdAt,
            updatedAt: newCard.updatedAt,
        };

        res.status(201).json(responseData);
    }
}

export default new CardsController();
