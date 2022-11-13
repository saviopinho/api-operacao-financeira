import { login } from '../controllers/LoginController';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /login:
 *  post:
 *    description: Realizar o login de uma pessoa.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/getLoginRequest'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/getLoginResponse'
 *      400:
 *        description: BadRequest Error
 *      401:
 *        description: UnauthorizeError
 *      500:
 *        description: Not Found**
 */
router.post('/', login);

export default router;
