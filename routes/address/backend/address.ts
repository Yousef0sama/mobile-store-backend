// imports

import express from "express";

// middle wares

import verifyBackendJWT from "../../../middleware/verifyBsckendJWT/verifyBackendJWT";

// controlers

import getAddressById from "../../../controllers/address/get/id/id";
import getAddressByUserId from "../../../controllers/address/get/userId/userId";

// use routers

const router = express.Router();
router.use(express.json());

// use middle wares

// check token

router.use(verifyBackendJWT);

// http handlers

router.get("/id/:id", getAddressById);
router.get("/userId/:userId", getAddressByUserId);

export default router;
