import express from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{console.log("hello MONGODB")}).catch(()=>{"eoorr in monfgoDB"});
const app=express();
app.listen(3000,(res,req)=>{
    console.log("server Started");    
});

