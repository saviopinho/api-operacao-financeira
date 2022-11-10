import transactionsController from '../controllers/TransactionsController';
import cardsController from '../controllers/CardsController';
import accounts from '../controllers/AccountsController';
import authHandler from '../middleware/AuthenticationHandler';
import paginatedResult from '../middleware/PaginationHandler';

import { Router } from 'express';

const router = Router();

router
    .get('/', authHandler.verifyToken, accounts.fetchAll)
    .post('/', authHandler.verifyToken, accounts.createOne)
    .get(
        '/:accountId/cards',
        authHandler.verifyToken,
        cardsController.fetchAccountCards
    )
    .post(
        '/:accountId/cards',
        authHandler.verifyToken,
        cardsController.createOne
    )
    .post(
        '/:accountId/transactions',
        authHandler.verifyToken,
        transactionsController.createOne
    );
// .get(
//     '/:accountId/transactions',
//     authHandler.verifyToken,
//     transactionsController.fetchAll,
//     paginatedResult.paginatedResult
// )
// .post(
//     '/:accountId/transactions/internal',
//     authHandler.verifyToken,
//     transactionsController.execTransfer
// )
// .get(
//     '/:accountId/balance',
//     authHandler.verifyToken,
//     transactionsController.fetchBalance
// )
// .post(
//     '/:accountId/transactions/:transactionId/revert',
//     authHandler.verifyToken,
//     transactionsController.execRevert
// );

export default router;
