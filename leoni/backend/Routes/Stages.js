import express from'express';
import { AddTypeStage,DeleteTypeStage,UpdateTypeStage } from '../Controllers/WithRole/Admin/Stages.js';
import GetTypeStage from '../Controllers/WithAll/Stages.js';
import { verifyAdmin ,verifyToken} from '../Utils/VerifyToken.js';

const router=express.Router();

router.post('/api/stages',verifyAdmin,AddTypeStage);
router.delete('/api/stages/:id',verifyAdmin,DeleteTypeStage);
router.patch('/api/stages/:id',verifyAdmin,UpdateTypeStage);
router.get('/api/stages',verifyToken,GetTypeStage);

export default router;
