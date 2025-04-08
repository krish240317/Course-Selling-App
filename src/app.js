import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routers/routes.js'

const app=express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use(express.static("public"));
app.use(cookieParser());  //to access and set user browser cookies

//Declare Routes 
app.use("/api",userRouter);

export {app}