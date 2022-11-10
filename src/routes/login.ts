import { login } from '../controllers/LoginController';
import { Router } from 'express';

const router = Router();

router.post('/', login);

export default router;
