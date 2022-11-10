import { v4 as uuid } from 'uuid';
import { BadRequestError, ConflictError } from '../helper/ApiError';
import { Request, Response, NextFunction } from 'express';

class AccountsController {
    async fetchAll(req: Request, res: Response, next: NextFunction) {
        try {
            const document = req.body.document;
            const foundAccounts = await accounts.findAll({
                where: { document },
            });
            const response_data = foundAccounts.map((el: any) => {
                return {
                    id: el.id,
                    branch: el.branch,
                    account: el.account,
                    createdAt: el.createdAt,
                    updatedAt: el.updatedAt,
                };
            });

            return res.status(200).send(response_data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    async createOne(req: Request, res: Response, next: NextFunction) {
        const document = req.body.document;
        const { branch, account } = req.body;

        const account_data = {
            id: uuid(),
            branch,
            account,
            document,
        };

        if (!(branch && account)) {
            throw new BadRequestError('All input is required');
        }

        if (branch.length !== 3) {
            throw new BadRequestError('Branch number must have 3 digits');
        }

        if (account.charAt(account.length - 2) !== '-') {
            throw new BadRequestError(
                'Invalid account number. It must be on this format: (XXXXXX-X)'
            );
        }

        const found = await accounts.findOne({
            where: { account },
        });

        if (found) {
            throw new ConflictError('Account already created');
        }

        const foundAccounts = await accounts.create(account_data);

        const response_data = {
            id: foundAccounts.id,
            branch: foundAccounts.branch,
            account: foundAccounts.account,
            createdAt: foundAccounts.createdAt,
            updatedAt: foundAccounts.updatedAt,
        };

        res.status(201).json(response_data);
    }
}

export default new AccountsController();
