import express from 'express';
import { verifyToken } from '../Utils/VerifyToken.js';
import { GetMaterielles,AddMaterielle,CountMaterielle } from '../Controllers/WithAll/Materielles.js';

const router=express.Router();

router.get('/api/societe/materielles/:id',verifyToken,GetMaterielles);
router.post('/api/societe/materielles/:id',verifyToken,AddMaterielle);
router.get('/api/societe/count/:id',verifyToken,CountMaterielle);


export default router;