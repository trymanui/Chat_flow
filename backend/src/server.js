import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js'
import path from 'path'
import cors from "cors";

import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cookieParser from "cookie-parser"


const app=express();
const __dirname=path.resolve();

const PORT=ENV.PORT||3000;

app.use(express.json()); 
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}))

app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoute);

if(ENV.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,'../frontend/dist')));

  app.get("*",(_,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}



app.listen(PORT,()=>{
  console.log('listening at 3000')
  connectDB()
})