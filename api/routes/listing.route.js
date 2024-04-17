import  express from 'express';
import { createListing,deleteListing, updateListing,getListing } from '../controller/listing.controller.js';
import { verifytoken } from '../utils/verifyUser.js';
const router=express.Router();
router.post('/create',verifytoken,createListing);
router.delete('/delete/:id', verifytoken, deleteListing);
router.post('/update/:id',verifytoken,updateListing);
router.get('/getUserData/:id',getListing);
export default router;