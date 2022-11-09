const { v4 } = require('uuid');
const { accounts } = require('../../models');
const { BadRequestError, ConflictError } = require('../helper/ApiError');

exports.fetchAll = async (req, res, next) => {
    try {
        const document = res.document;
        const foundAccounts = await accounts.findAll({ where: { document } });
        const response_data = foundAccounts.map((el) => {
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
};

exports.createOne = async (req, res, next) => {
    const document = res.document;
    const { branch, account } = req.body;

    const account_data = {
        id: v4(),
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
};
