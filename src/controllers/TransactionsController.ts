import { v4 as uuid } from 'uuid';
import { BadRequestError, UnauthorizeError } from '../helper/ApiError';
import { Request, Response, NextFunction } from 'express';
import { transactionRepo } from '../repositories/transactionRepository';

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

        const transactionList = await transactionRepo.findBy({
            accountId,
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
        };

        const transaction = transactionRepo.create(transactionData);

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

        const transactionList = await transactionRepo.find({
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
        const transactionList = await transactionRepo.findBy({ accountId });

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

        const transactionList = await transactionRepo.findBy({
            accountId,
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

        await transactionRepo.create(senderData);
        const transferTransaction = await transactionRepo.create(receiverData);

        res.status(201).send(transferTransaction);
    }

    async execRevert(req: Request, res: Response, next: NextFunction) {
        const { accountId, transactionId } = req.params;

        const transactionList = await transactionRepo.findBy({
            accountId,
        });

        const foundTransaction = await transactionRepo.findOneBy({
            id: transactionId,
        });

        if (foundTransaction!.reversedAt) {
            throw new UnauthorizeError(
                'The same transaction cannot be reversed more than once'
            );
        }
        const balance = this.getBalance(transactionList);
        const reversedValue = -foundTransaction!.value;

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

        await transactionRepo.update(
            { reversedAt: revertDate },
            { id: transactionId }
        );

        const newTransaction = await transactionRepo.create(revertData);

        const revertResponseData = {
            id: newTransaction.id,
            value: foundTransaction!.value,
            description: newTransaction.description,
            createdAt: newTransaction.createdAt,
            updatedAt: newTransaction.updatedAt,
        };

        res.status(201).send(revertResponseData);
    }
}

export default new TransactionsController();
