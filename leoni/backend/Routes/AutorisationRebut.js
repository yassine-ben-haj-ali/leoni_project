import express from 'express';
import { verifyAdmin,verifyToken } from '../Utils/VerifyToken.js';
import { addRebut,GetmyRebut } from '../Controllers/WithAll/AutorisationRebut.js';
import { Getautorisations,confirm_refus } from '../Controllers/WithRole/Admin/AutorisationRebut.js';

 const router=express.Router();

router.post('/api/autorisation/rebut',verifyToken,addRebut);
router.get('/api/autorisation/myrebut',verifyToken,GetmyRebut);
router.patch('/api/autorisation/rebut/:id',verifyAdmin,confirm_refus);
router.get('/api/autorisation/rebut/',verifyAdmin,Getautorisations);

export default router;