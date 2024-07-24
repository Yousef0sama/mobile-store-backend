// imports

import express from "express";

// controllers

import register from "../../controllers/auth/register/register";
import login from "../../controllers/auth/login/login";
import refresh from "../../controllers/auth/refresh/refresh";
import logout from "../../controllers/auth/logout/logout";

// use routers

const router = express.Router();
router.use(express.json());

// POST

// register
router.post("/register",  register);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

// GET

// refresh token
router.get("/refresh", refresh);

export default router;
