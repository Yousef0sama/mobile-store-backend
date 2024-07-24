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
const address_1 = __importDefault(require("./routes/address/frontend/address"));
const address_2 = __importDefault(require("./routes/address/backend/address"));
const bank_cards_1 = __importDefault(require("./routes/bank_cards/bank_cards"));
const users_1 = __importDefault(require("./routes/users/frontend/users"));
const users_2 = __importDefault(require("./routes/users/backend/users"));
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
app.use('/users', users_1.default);
app.use('/usersForBackend', users_2.default);
app.use('/address', address_1.default);
app.use('/addressForBackend', address_2.default);
app.use('/bankCards', bank_cards_1.default);
// listen
const port = process.env.PORT || 5000;
app.listen(port);
