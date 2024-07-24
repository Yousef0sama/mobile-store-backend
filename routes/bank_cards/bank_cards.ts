// imports

import express from "express";

// middle wares

import verifyAuthJWT from "../../middleware/verifyAuthJWT/verifyAuthJWT";

// controlers

import addCard from "../../controllers/cards/add/add";
import updateCard from "../../controllers/cards/update/update";
import deleteCard from "../../controllers/cards/delete/delete";

// use routers

const router = express.Router();
router.use(express.json());

// use middle wares

// check token
router.use(verifyAuthJWT)

// http handlers

router.post("/", addCard);
router.put("/", updateCard);
router.delete("/", deleteCard);

export default router;