import transactionsController from '../controllers/TransactionsController';
import cardsController from '../controllers/CardsController';
import accounts from '../controllers/AccountsController';
import authHandler from '../middleware/authenticationHandler';
import paginatedResult from '../middleware/paginationHandler';

import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /accounts:
 *  post:
 *    description: Realizar a criação de uma conta para uma pessoa.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/postAccountsRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/postAccountsResponse'
 *      400:
 *        description: BadRequest Error
 *      409:
 *        description: Conflict Error
 *      500:
 *        description: Not Found
 */
router.post('/', authHandler.verifyToken, accounts.createOne);

/**
 * @swagger
 * /accounts:
 *  get:
 *    description: Realizar a listagem de todas as contas de uma pessoa.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAccountsResponse'
 *      500:
 *        description: Not Found
 */
router.get('/', authHandler.verifyToken, accounts.fetchAll);

/**
 * @swagger
 * /accounts/{accountId}/cards:
 *  post:
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        type: string
 *        description: Account ID
 *    description: Realizar a criação de um cartão em uma conta.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/postAccountCardRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/postAccountCardResponse'
 *      400:
 *        description: BadRequest Error
 *      409:
 *        description: Conflict Error
 *      500:
 *        description: Not Found
 */
router.post(
    '/:accountId/cards',
    authHandler.verifyToken,
    cardsController.createOne
);

/**
 * @swagger
 * /accounts/{accountId}/cards:
 *  get:
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        type: string
 *        description: Account ID
 *    description: Realizar a listagem de todos os cartões de uma conta.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAccountCardsResponse'
 *      500:
 *        description: Not Found
 */
router.get(
    '/:accountId/cards',
    authHandler.verifyToken,
    cardsController.fetchAccountCards
);

/**
 * @swagger
 * /accounts/{accountId}/transactions:
 *  post:
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        type: string
 *        description: Account ID
 *    description: Realizar a criação de uma transação em uma conta. Uma transação pode ser de débito ou crédito.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/postAccountTransactionRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/postAccountTransactionResponse'
 *      400:
 *        description: BadRequest Error
 *      401:
 *        description: UnauthorizeError
 *      500:
 *        description: Not Found
 */
router.post(
    '/:accountId/transactions',
    authHandler.verifyToken,
    transactionsController.createOne
);

/**
 * @swagger
 * /accounts/{accountId}/transactions/internal:
 *  post:
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        type: string
 *        description: Account ID
 *    description: Realizar a criação de transferência interna entre contas cadastradas na aplicação.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/postAccountTransferRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/postAccountTransferResponse'
 *      400:
 *        description: BadRequest Error
 *      401:
 *        description: UnauthorizeError
 *      500:
 *        description: Not Found
 */
router.post(
    '/:accountId/transactions/internal',
    authHandler.verifyToken,
    transactionsController.execTransfer
);

/**
 * @swagger
 * /accounts/{accountId}/transactions:
 *  get:
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        type: string
 *        description: Account ID
 *      - in: query
 *        name: itemsPerPage
 *        type: integer
 *        description: Amount of items per page
 *      - in: query
 *        name: currentPage
 *        type: integer
 *        description: Current page
 *    description: Listagem de todas as transações de uma conta, com paginação opcional via query parameters.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getAccountTransactionResponse'
 *      500:
 *        description: Not Found
 */
router.get(
    '/:accountId/transactions',
    authHandler.verifyToken,
    transactionsController.fetchAll,
    paginatedResult.paginatedResult
);

/**
 * @swagger
 * /accounts/{accountId}/balance:
 *  get:
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        type: string
 *        description: Account ID
 *    description: Retorna o saldo de uma conta.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getBalanceResponse'
 *      500:
 *        description: Not Found
 */
router.get(
    '/:accountId/balance',
    authHandler.verifyToken,
    transactionsController.fetchBalance
);

/**
 * @swagger
 * /accounts/{accountId}/transactions/{transactionId}/revert:
 *  post:
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *        type: string
 *        description: Account ID
 *      - in: path
 *        name: transactionId
 *        required: true
 *        type: string
 *        description: Transaction ID*
 *    description: Realizar a reversão de uma transação.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/postRevertResponse'
 *      401:
 *        description: UnauthorizeError
 *      500:
 *        description: Not Found
 */
router.post(
    '/:accountId/transactions/:transactionId/revert',
    authHandler.verifyToken,
    transactionsController.execRevert
);

export default router;
