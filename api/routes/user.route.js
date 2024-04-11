import express from  'express';
import { tests,updateUser,deleteUser} from '../controller/user.controller.js';
import { verifytoken } from '../utils/verifyUser.js';
const router=express.Router();
router.get('/test',tests);
router.post('/update/:id',verifytoken,updateUser);
router.delete('/delete/:id',verifytoken,deleteUser);

export default router;