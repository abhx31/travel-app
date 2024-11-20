import express from 'express';
import authRouter from './routes/authRoutes';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
require("dotenv").config();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);


app.listen(process.env.PORT, ()=>{
    console.log("Server running")
})