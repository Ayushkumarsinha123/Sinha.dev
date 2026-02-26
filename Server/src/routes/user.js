import express from 'express';
import { loginUser, registerUser } from '../controllers/user.js';

const router = express();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;