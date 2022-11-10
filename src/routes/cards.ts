import authHandler from '../middleware/AuthenticationHandler';
import cardsController from '../controllers/CardsController';
import paginateHandler from '../middleware/PaginationHandler';
import { Router } from 'express';

const router = Router();

router.get(
    '/',
    authHandler.verifyToken,
    cardsController.getPeopleCards,
    paginateHandler.paginatedResult
);

export default router;
