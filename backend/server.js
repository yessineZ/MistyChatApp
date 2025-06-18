import express from 'express';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path'; 
import messageRoutes from './routes/message.routes.js';
import authRoutes from './routes/auth.routes.js';
import CheckAuth from './middlewares/checkAuth.js';
import userRoutes from './routes/user.routes.js'; 
import { app, server, io } from './socket/socket.js';
import { connectToMongoDb } from './db/connectToMongo.js';
import axios from 'axios' ;

const __dirname = path.resolve() ; 

dotenv.config({
    path: './.env' 
});

const port = process.env.PORT; 


app.use(cookieParser()); 
app.use(express.json());  
app.use(cors({
    origin: '*', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



server.listen(port,() => {
    connectToMongoDb();
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});



app.use("/api/auth", authRoutes); 
app.use("/api/messages", messageRoutes); 
app.use("/api/users", userRoutes);


app.route('/meta-webhook')
    .get((req, res) => {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'test';

        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('✅ Webhook verified');
            res.status(200).send(challenge);
        } else {
            console.warn('❌ Webhook verification failed');
            res.sendStatus(403);
        }
    })
    .post(async (req, res) => {
        console.log('📩 Webhook received from Meta:', JSON.stringify(req.body, null, 2));

        try {
            
            const n8nWebhookUrl = 'https://n8n.uat.platana.fr/webhook-test/2f5eae37-1bb0-4a73-b239-f63ba603f91';

            const response = await axios.post(n8nWebhookUrl, req.body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('➡️ Forwarded to n8n with status:', response.status);
        } catch (error) {
            console.error('Failed to forward to n8n:', error?.response?.data || error.message);
        }


        res.sendStatus(200);
    });





app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist','index.html'));

})
