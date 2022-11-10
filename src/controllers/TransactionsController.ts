import { v4 as uuid } from 'uuid';
import { BadRequestError, UnauthorizeError } from '../helper/ApiError';
import { Request, Response, NextFunction } from 'express';

class TransactionsController {
    getBalance = (list: any) => {
        let balance = 0.0;

        for (const item of list) {
            balance = balance + parseFloat(item.value);
        }

        return balance;
    };

    async createOne(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;
        const { value, description } = req.body;

        if (!(value && description)) {
            throw new BadRequestError('All input is required');
        }

        const transactionList = await transactions.findAll({
            where: { accountId },
        });

        const formatedValue = parseFloat(parseFloat(value).toFixed(2));
        const balance = this.getBalance(transactionList);

        if (balance + value < 0) {
            throw new UnauthorizeError(
                'Insufficient funds for that transaction'
            );
        }

        const transactionData = {
            id: uuid(),
            value,
            description,
            accountId,
            reversedAt: null,
        };

        const transaction = await transactions.create(transactionData);

        const responseData = {
            id: transaction.id,
            value: formatedValue,
            description: transaction.description,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        };

        res.status(201).json(responseData);
    }

    async fetchAll(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;

        const transactionList = await transactions.findAll({
            where: { accountId },
        });

        const responseData = transactionList.map((el: any) => {
            return {
                id: el.id,
                value: parseFloat(el.value),
                description: el.description,
                createdAt: el.createdAt,
                updatedAt: el.updatedAt,
            };
        });

        req.body.list = responseData;
        req.body.title = 'transactions';

        next();
    }

    async fetchBalance(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;
        const transactionList = await transactions.findAll({
            where: { accountId },
        });

        const balance = this.getBalance(transactionList);

        return res
            .status(200)
            .send({ balance: parseFloat(balance.toFixed(2)) });
    }

    async execTransfer(req: Request, res: Response, next: NextFunction) {
        const { accountId } = req.params;
        const { receiverAccountId, value, description } = req.body;

        if (!(receiverAccountId && value && description)) {
            throw new BadRequestError('All input is required');
        }

        const transactionList = await transactions.findAll({
            where: { accountId },
        });

        const balance = this.getBalance(transactionList);

        if (balance - value < 0) {
            throw new UnauthorizeError('Insufficient funds for transfer');
        }

        const senderData = {
            id: uuid(),
            value: -value,
            description,
            accountId,
        };

        const receiverData = {
            id: uuid(),
            value,
            description,
            accountId: receiverAccountId,
        };

        await transactions.create(senderData);
        const transferTransaction = await transactions.create(receiverData);

        res.status(201).send(transferTransaction);
    }

    async execRevert(req: Request, res: Response, next: NextFunction) {
        const { accountId, transactionId } = req.params;

        const transactionList = await transactions.findAll({
            where: { accountId },
        });

        const foundTransaction = await transactions.findOne({
            where: { id: transactionId },
        });

        if (foundTransaction.reversedAt) {
            throw new UnauthorizeError(
                'The same transaction cannot be reversed more than once'
            );
        }

        const balance = this.getBalance(transactionList);
        const reversedValue = parseFloat(-foundTransaction.value);

        if (balance + reversedValue < 0) {
            throw new UnauthorizeError('Negative balance is not allowed');
        }

        const revertDate = new Date();

        const revertData = {
            id: uuid(),
            value: reversedValue,
            description: 'Refund of improper transaction',
            accountId,
            reversedAt: revertDate,
        };

        await transactions.update(
            { reversedAt: revertDate },
            { where: { id: transactionId } }
        );

        const newTransaction = await transactions.create(revertData);

        const revertResponseData = {
            id: newTransaction.id,
            value: parseFloat(foundTransaction.value),
            description: newTransaction.description,
            createdAt: newTransaction.createdAt,
            updatedAt: newTransaction.updatedAt,
        };

        res.status(201).send(revertResponseData);
    }
}

export default new TransactionsController();
