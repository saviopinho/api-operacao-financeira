import complianceHandler from '../middleware/ComplianceHandler';
import peopleController from '../controllers/PeopleController';
import { Router } from 'express';

const router = Router();

router.post(
    '/',
    complianceHandler.validateDocument,
    peopleController.createOne
);

export default router;
