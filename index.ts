// imports

import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"

// routes

import users from "./routes/auth/auth";

// configs

import { corsOptions } from "./config/corsOptions/corsOptions";

// .env cnofig

dotenv.config();

// use app

const app = express()

// middle ware

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());

// handlers

app.use('/auth', users);

// listen

const port = process.env.PORT || 5000

app.listen(port);