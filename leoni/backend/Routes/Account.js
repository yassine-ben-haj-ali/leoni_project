import  express from 'express';
import ChangePassword from '../Controllers/WithAll/Account.js';
import { verifyToken } from '../Utils/VerifyToken.js';

const router=express.Router();

router.post('/api/account',verifyToken,ChangePassword);

export default router;