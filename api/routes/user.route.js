import express from  'express';
import { tests,updateUser,deleteUser,getUserListings} from '../controller/user.controller.js';
import { verifytoken } from '../utils/verifyUser.js';
const router=express.Router();
router.get('/test',tests);
router.post('/update/:id',verifytoken,updateUser);
router.delete('/delete/:id',verifytoken,deleteUser);
router.get('/listings/:id', verifytoken, getUserListings)

export default router;