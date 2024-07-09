"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// routes
const auth_1 = __importDefault(require("./routes/auth/auth"));
// configs
const corsOptions_1 = require("./config/corsOptions/corsOptions");
// .env cnofig
dotenv_1.default.config();
// use app
const app = (0, express_1.default)();
// middle ware
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// handlers
app.use('/auth', auth_1.default);
// listen
const port = process.env.PORT || 5000;
app.listen(port);
