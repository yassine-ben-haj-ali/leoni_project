import express from 'express';
import { verifyAdmin,verifyToken } from '../Utils/VerifyToken.js';
import { AddSociete,GetMyAutorisation,GetQuantity } from '../Controllers/WithAll/AutorisationSociete.js';
import { GetAutorisations,confirm_refus } from '../Controllers/WithRole/Admin/AutorisationSociete.js';

const router=express.Router();

router.post('/api/autorisation/societe',verifyToken,AddSociete);
router.get('/api/autorisation/mysociete',verifyToken,GetMyAutorisation);
router.patch('/api/autorisation/societe/:id',verifyAdmin,confirm_refus);
router.get('/api/autorisation/societe/',verifyAdmin,GetAutorisations);
router.get('/api/autorisation/societe/quantity/:id',verifyToken,GetQuantity);

export default router;