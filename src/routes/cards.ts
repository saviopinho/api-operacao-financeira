import authHandler from '../middleware/authenticationHandler';
import paginateHandler from '../middleware/paginationHandler';
import cardsController from '../controllers/CardsController';
import { Router } from 'express';

const router = Router();

router.get(
    '/',
    authHandler.verifyToken,
    cardsController.getPeopleCards,
    paginateHandler.paginatedResult
);

export default router;
