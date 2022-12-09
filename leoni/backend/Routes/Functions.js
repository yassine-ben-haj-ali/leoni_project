import express from 'express';
import { verifyAdmin } from "../Utils/VerifyToken.js";
import { AddFunction,GetFunctions,DeleteFunction,UpdateFunction } from '../Controllers/WithRole/Admin/Functions.js';

const router=express.Router();


router.post('/api/functions',verifyAdmin,AddFunction);
router.delete('/api/functions/:id',verifyAdmin,DeleteFunction);
router.patch('/api/functions/:id',verifyAdmin,UpdateFunction);
router.get('/api/functions',verifyAdmin,GetFunctions);

export default router;