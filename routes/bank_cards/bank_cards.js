"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// middle wares
const verifyAuthJWT_1 = __importDefault(require("../../middleware/verifyAuthJWT/verifyAuthJWT"));
// controlers
const add_1 = __importDefault(require("../../controllers/cards/add/add"));
const update_1 = __importDefault(require("../../controllers/cards/update/update"));
const delete_1 = __importDefault(require("../../controllers/cards/delete/delete"));
// use routers
const router = express_1.default.Router();
router.use(express_1.default.json());
// use middle wares
// check token
router.use(verifyAuthJWT_1.default);
// http handlers
router.post("/", add_1.default);
router.put("/", update_1.default);
router.delete("/", delete_1.default);
exports.default = router;
