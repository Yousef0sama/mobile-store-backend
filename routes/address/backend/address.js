"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// middle wares
const verifyBackendJWT_1 = __importDefault(require("../../../middleware/verifyBsckendJWT/verifyBackendJWT"));
// controlers
const id_1 = __importDefault(require("../../../controllers/address/get/id/id"));
const userId_1 = __importDefault(require("../../../controllers/address/get/userId/userId"));
// use routers
const router = express_1.default.Router();
router.use(express_1.default.json());
// use middle wares
// check token
router.use(verifyBackendJWT_1.default);
// http handlers
router.get("/id/:id", id_1.default);
router.get("/userId/:userId", userId_1.default);
exports.default = router;
