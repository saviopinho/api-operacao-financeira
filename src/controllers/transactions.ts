const { v4 } = require('uuid');
const { transactions } = require('../../models');
const { BadRequestError, UnauthorizeError } = require('../helper/ApiError');

const getBalance = (list) => {
    let balance = 0.0;

    for (const item of list) {
        balance = parseFloat(balance) + parseFloat(item.value);
    }

    return parseFloat(balance);
};

exports.createOne = async (req, res, next) => {
    const { accountId } = req.params;
    const { value, description } = req.body;

    if (!(value && description)) {
        throw new BadRequestError('All input is required');
    }

    const transactionList = await transactions.findAll({
        where: { accountId },
    });

    const formatedValue = parseFloat(parseFloat(value).toFixed(2));
    const balance = getBalance(transactionList);

    if (balance + value < 0) {
        throw new UnauthorizeError('Insufficient funds for that transaction');
    }

    const transactionData = {
        id: v4(),
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
};

exports.fetchAll = async (req, res, next) => {
    const { accountId } = req.params;

    const transactionList = await transactions.findAll({
        where: { accountId },
    });

    const responseData = transactionList.map((el) => {
        return {
            id: el.id,
            value: parseFloat(el.value),
            description: el.description,
            createdAt: el.createdAt,
            updatedAt: el.updatedAt,
        };
    });

    res.list = responseData;
    res.title = 'transactions';

    next();
};

exports.fetchBalance = async (req, res, next) => {
    const { accountId } = req.params;
    const transactionList = await transactions.findAll({
        where: { accountId },
    });

    const balance = getBalance(transactionList);

    return res.status(200).send({ balance: parseFloat(balance.toFixed(2)) });
};

exports.execTransfer = async (req, res, next) => {
    const { accountId } = req.params;
    const { receiverAccountId, value, description } = req.body;

    if (!(receiverAccountId && value && description)) {
        throw new BadRequestError('All input is required');
    }

    const transactionList = await transactions.findAll({
        where: { accountId },
    });

    const balance = getBalance(transactionList);

    if (balance - value < 0) {
        throw new UnauthorizeError('Insufficient funds for transfer');
    }

    const senderData = {
        id: v4(),
        value: -value,
        description,
        accountId,
    };

    const receiverData = {
        id: v4(),
        value,
        description,
        accountId: receiverAccountId,
    };

    await transactions.create(senderData);
    const transferTransaction = await transactions.create(receiverData);

    res.status(201).send(transferTransaction);
};

exports.execRevert = async (req, res, next) => {
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

    const balance = getBalance(transactionList);
    const reversedValue = parseFloat(-foundTransaction.value);

    if (balance + reversedValue < 0) {
        throw new UnauthorizeError('Negative balance is not allowed');
    }

    const revertDate = new Date();

    const revertData = {
        id: v4(),
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
};
