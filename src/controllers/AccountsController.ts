import { v4 as uuid } from 'uuid';
import { BadRequestError, ConflictError } from '../helper/ApiError';
import { Request, Response, NextFunction } from 'express';
import { accountRepo } from '../data/repositories/accountRepository';
import { Account } from '../data/entities/Account';

class AccountsController {
    async fetchAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { document } = req.body;
            const foundAccounts = await accountRepo.find({
                where: { document },
            });
            const responseData = foundAccounts.map((el: Account) => {
                return {
                    id: el.id,
                    branch: el.branch,
                    account: el.account,
                    createdAt: el.createdAt,
                    updatedAt: el.updatedAt,
                };
            });

            return res.status(200).send(responseData);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        const { document } = req.body;
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

        const found = await accountRepo.findOneBy({ account });

        if (found) {
            throw new ConflictError('Account already created');
        }

        const newAccount = accountRepo.create(account_data);
        await accountRepo.save(newAccount);

        const responseData = {
            id: newAccount.id,
            branch: newAccount.branch,
            account: newAccount.account,
            createdAt: newAccount.createdAt,
            updatedAt: newAccount.updatedAt,
        };

        res.status(201).json(responseData);
    }
}

export default new AccountsController();
