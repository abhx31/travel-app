import express from 'express';
import authRouter from './routes/auth.routes';
import cookieParser from "cookie-parser";
import cors from 'cors';
import tripRouter from './routes/trip.routes';

const app = express();
require("dotenv").config();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/trip', tripRouter);


app.listen(process.env.PORT, ()=>{
    console.log("Server running")
})
