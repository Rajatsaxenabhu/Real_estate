import express from  'express';
import { tests } from '../controller/user.controller.js';
const router=express.Router();
router.get('/test',tests);
export default router;