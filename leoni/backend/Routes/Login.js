import express from 'express';
import login from '../Controllers/WithAll/Login.js';

const router=express.Router();

router.post('/api/login',login);

export default router;