import  express  from "express";
import { verifyToken, verifyAdmin } from "../Utils/VerifyToken.js";
import { Getautorisations,confirm_refus } from "../Controllers/WithRole/Admin/AutorisationRebut.js";
import { GetmyPersonel,AddPersonel } from "../Controllers/WithAll/AutorisationPersonel.js";

const router=express.Router();


router.post('/api/autorisation/personel',verifyToken,AddPersonel);
router.get('/api/autorisation/mypersonel',verifyToken,GetmyPersonel);
router.patch('/api/autorisation/personel/:id',verifyAdmin,confirm_refus);
router.get('/api/autorisation/personel/',verifyAdmin,Getautorisations);

export default router;