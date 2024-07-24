"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// middle wares
const verifyAuthJWT_1 = __importDefault(require("../../../middleware/verifyAuthJWT/verifyAuthJWT"));
// controlers
const id_1 = __importDefault(require("../../../controllers/users/user/get/id/id"));
// use routers
const router = express_1.default.Router();
router.use(express_1.default.json());
// use middle wares
router.use(verifyAuthJWT_1.default);
// http handlers
router.get("/id/:id", id_1.default);
exports.default = router;
