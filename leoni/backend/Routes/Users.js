import express from 'express';
import { verifyAdmin } from '../Utils/VerifyToken.js';
import { AddUser,DeleteUser,UpdateUser,GetUsers } from '../Controllers/WithRole/Admin/users.js';
const router=express.Router();

router.post('/api/users',verifyAdmin,AddUser);
router.delete('/api/users/:id',verifyAdmin,DeleteUser);
router.patch('/api/users/:id',verifyAdmin,UpdateUser);
router.get('/api/users',verifyAdmin,GetUsers);

export default router;
