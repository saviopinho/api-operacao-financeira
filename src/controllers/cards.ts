const { v4 } = require('uuid');
const { cards } = require('../../models');
const { BadRequestError, ConflictError } = require('../helper/ApiError');

exports.fetchAccountCards = async (req, res, next) => {
    const document = res.document;
    const { accountId } = req.params;
    const foundCards = await cards.findAll({ where: { document, accountId } });

    const response_data = foundCards.map((el) => {
        return {
            id: el.id,
            type: el.type,
            number: el.number,
            cvv: el.cvv,
            createdAt: el.createdAt,
            updatedAt: el.updatedAt,
        };
    });

    return res.status(200).send(response_data);
};

exports.getPeopleCards = async (req, res, next) => {
    try {
        const document = res.document;
        const foundCards = await cards.findAll({ where: { document } });

        const response_data = foundCards.map((el) => {
            return {
                id: el.id,
                type: el.type,
                number: el.number.slice(-4),
                cvv: el.cvv,
                createdAt: el.createdAt,
                updatedAt: el.updatedAt,
            };
        });

        res.list = response_data;
        res.title = 'cards';

        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.createOne = async (req, res, next) => {
    const document = res.document;
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

    if (type == 'physical') {
        const physicalCards = await cards.count({
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

    const foundCard = await cards.findOne({
        where: { number },
    });

    if (foundCard) {
        throw new ConflictError('Card already created');
    }

    const card_data = {
        id: v4(),
        type,
        number,
        cvv,
        accountId,
        document,
    };

    const foundCards = await cards.create(card_data);

    const response_data = {
        id: foundCards.id,
        type: foundCards.type,
        number: lastNumbers,
        cvv: foundCards.cvv,
        createdAt: foundCards.createdAt,
        updatedAt: foundCards.updatedAt,
    };

    res.status(201).json(response_data);
};
