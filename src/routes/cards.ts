import authHandler from '../middleware/authenticationHandler';
import paginateHandler from '../middleware/paginationHandler';
import cardsController from '../controllers/CardsController';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /cards:
 *  get:
 *    parameters:
 *      - in: query
 *        name: itemsPerPage
 *        type: integer
 *        description: Amount of items per page
 *      - in: query
 *        name: currentPage
 *        type: integer
 *        description: Current page
 *    description: Realizar a listagem de todos os cartões de uma pessoa, com paginação opcional.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getCardsResponse'
 *      500:
 *        description: Not Found*
 */
router.get(
    '/',
    authHandler.verifyToken,
    cardsController.postPeopleCards,
    paginateHandler.paginatedResult
);

export default router;
