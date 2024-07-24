// imports

import express from "express";

// controlers

import getUserById from "../../../controllers/users/user/get/id/id";
import getUserByEmail from "../../../controllers/users/user/get/email/email";

// middle wares

import verifyBackendJWT from "../../../middleware/verifyBsckendJWT/verifyBackendJWT";

// use routers

const router = express.Router();
router.use(express.json());

// use middle wares

// router.use(verifyBackendJWT);

// http handlers

router.get("/id/:id", getUserById);
router.get("/email/:email", getUserByEmail);

export default router;
