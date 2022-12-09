import express from'express';
import { verifyAdmin ,verifyToken} from '../Utils/VerifyToken.js';
import { AddTypeSortie,DeleteTypeSortie,UpdateTypeSortie } from '../Controllers/WithRole/Admin/Sorties.js';
import GetTypeSortie from '../Controllers/WithAll/Sorties.js';

const router=express.Router();

router.post('/api/sorties',verifyAdmin,AddTypeSortie);
router.delete('/api/sorties/:id',verifyAdmin,DeleteTypeSortie);
router.patch('/api/sorties/:id',verifyAdmin,UpdateTypeSortie);
router.get('/api/sorties',verifyToken,GetTypeSortie);

export default router;
