import complianceHandler from '../middleware/complianceHandler';
import peopleController from '../controllers/PeopleController';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /people:
 *  post:
 *    description: Realizar a criação de uma pessoa.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/postPeopleRequest'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/postPeopleResponse'
 *      409:
 *        description: Conflict Error
 *      500:
 *        description: Not Found*
 */
router.post(
    '/',
    complianceHandler.validateDocument,
    peopleController.createOne
);

export default router;
