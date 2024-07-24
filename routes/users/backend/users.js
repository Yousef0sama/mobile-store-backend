"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controlers
const id_1 = __importDefault(require("../../../controllers/users/user/get/id/id"));
const email_1 = __importDefault(require("../../../controllers/users/user/get/email/email"));
// use routers
const router = express_1.default.Router();
router.use(express_1.default.json());
// use middle wares
// router.use(verifyBackendJWT);
// http handlers
router.get("/id/:id", id_1.default);
router.get("/email/:email", email_1.default);
exports.default = router;
