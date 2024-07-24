// imports

import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"

// routes

import auth from "./routes/auth/auth";
import addressForFrontend from "./routes/address/frontend/address";
import addressForBackend from "./routes/address/backend/address";
import bankCards from "./routes/bank_cards/bank_cards";
import usersForFrontend from "./routes/users/frontend/users"
import usersForBackend from "./routes/users/backend/users"

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

app.use('/auth', auth);
app.use('/users', usersForFrontend);
app.use('/usersForBackend', usersForBackend);
app.use('/address', addressForFrontend);
app.use('/addressForBackend', addressForBackend);
app.use('/bankCards', bankCards);

// listen

const port = process.env.PORT || 5000

app.listen(port);