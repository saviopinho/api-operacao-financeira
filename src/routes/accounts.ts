const verifyToken = require('../middleware/AuthenticationHandler');
const { paginatedResult } = require('../middleware/PaginationHandler');
const accounts = require('../controllers/accounts');
const cards = require('../controllers/cards');
const trans = require('../controllers/transactions');
const router = require('express').Router();

router
    .get('/', verifyToken, accounts.fetchAll)
    .post('/', verifyToken, accounts.createOne)
    .get('/:accountId/cards', verifyToken, cards.fetchAccountCards)
    .post('/:accountId/cards', verifyToken, cards.createOne)
    .post('/:accountId/transactions', verifyToken, trans.createOne)
    .get(
        '/:accountId/transactions',
        verifyToken,
        trans.fetchAll,
        paginatedResult
    )
    .post('/:accountId/transactions/internal', verifyToken, trans.execTransfer)
    .get('/:accountId/balance', verifyToken, trans.fetchBalance)
    .post(
        '/:accountId/transactions/:transactionId/revert',
        verifyToken,
        trans.execRevert
    );

module.exports = router;
