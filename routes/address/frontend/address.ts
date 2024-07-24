// imports

import express from "express";

// middle wares

import verifyAuthJWT from "../../../middleware/verifyAuthJWT/verifyAuthJWT";

// controlers

import addAddress from "../../../controllers/address/add/add";
import updateAddress from "../../../controllers/address/update/update";
import deleteAddress from "../../../controllers/address/delete/delete";
import getAddressById from "../../../controllers/address/get/id/id";

// use routers

const router = express.Router();
router.use(express.json());

// use middle wares

// check token
router.use(verifyAuthJWT)

// http handlers

router.post("/", addAddress);
router.put("/", updateAddress);
router.delete("/", deleteAddress);
export default router;
