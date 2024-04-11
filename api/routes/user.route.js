import express from  'express';
import { tests,updateUser} from '../controller/user.controller.js';
import { verifytoken } from '../utils/verifyUser.js';
const router=express.Router();
router.get('/test',tests);
router.post('/update/:id',verifytoken,updateUser);
export default router;