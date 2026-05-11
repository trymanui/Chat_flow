import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutea from './routes/message.route.js'

dotenv.config();

const app=express();

const PORT=process.env.PORT||3000;

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutea);

app.listen(PORT,()=>console.log('listening at 3000'))