import compHandler from '../middleware/ComplianceHandler';
import peopleController from '../controllers/PeopleController';
import { Router } from 'express';

const router = Router();

router.post('/', compHandler.validateDocument, peopleController.createOne);

export default router;
