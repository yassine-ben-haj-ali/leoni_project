import express from 'express';
import { verifyAdmin } from '../Utils/VerifyToken.js';
import { AddService,UpdateService,DeleteService,GetServices } from '../Controllers/WithRole/Admin/Services.js';

const router=express.Router();

router.post('/api/services',verifyAdmin,AddService);
router.delete('/api/services/:id',verifyAdmin,DeleteService);
router.patch('/api/services/:id',verifyAdmin,UpdateService);
router.get('/api/services',verifyAdmin,GetServices);

export default router;