import complianceHandler from '../middleware/complianceHandler';
import peopleController from '../controllers/PeopleController';
import { Router } from 'express';

const router = Router();

router.post(
    '/',
    complianceHandler.validateDocument,
    peopleController.createOne
);

export default router;
