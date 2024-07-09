"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controllers
const register_1 = __importDefault(require("../../controllers/auth/register/register"));
const login_1 = __importDefault(require("../../controllers/auth/login/login"));
const refresh_1 = __importDefault(require("../../controllers/auth/refresh/refresh"));
const logout_1 = __importDefault(require("../../controllers/auth/logout/logout"));
// use routers
const router = express_1.default.Router();
router.use(express_1.default.json());
// POST
// register
router.post("/register", register_1.default);
// login
router.post("/login", login_1.default);
router.get("/refresh", refresh_1.default);
router.post("/logout", logout_1.default);
exports.default = router;
