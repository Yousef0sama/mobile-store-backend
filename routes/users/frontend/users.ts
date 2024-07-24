// imports

import express from "express";

// middle wares

import verifyAuthJWT from "../../../middleware/verifyAuthJWT/verifyAuthJWT";

// controlers

import getUserById from "../../../controllers/users/user/get/id/id";

// use routers

const router = express.Router();
router.use(express.json());

// use middle wares

router.use(verifyAuthJWT);

// http handlers

router.get("/id/:id", getUserById);

export default router;
