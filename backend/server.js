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

dotenv.config({
    path: './.env' // specify .env file location
});

const port = process.env.PORT; // Use the PORT environment variable

const __dirname = path.resolve() ; 


app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist','index.html'));

})
app.use(cookieParser()); 
app.use(express.json());  // to accept json data
app.use(cors({
    origin: '*', // allow requests from this origin
    credentials: true, // send cookies when making requests
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
