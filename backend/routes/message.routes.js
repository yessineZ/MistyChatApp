import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import CheckAuth from '../middlewares/checkAuth.js'
import { getMessages } from '../controllers/message.controller.js';
const router = express.Router() ; 

router.get('/:id',CheckAuth,getMessages) ; 

router.post('/send/:id',CheckAuth,sendMessage) ; 

export default router;  