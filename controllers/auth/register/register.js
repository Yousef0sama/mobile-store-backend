"use strict";
// imports
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
// db
const Conn_1 = require("../../../config/db/Conn");
// functions
const time_convert_1 = __importDefault(require("../../../functions/time_convert/time_convert"));
const check_inputs_1 = __importDefault(require("../../../functions/check_inputs/check_inputs"));
const encode_1 = __importDefault(require("../../../functions/jwt/encode/encode"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phone } = req.body;
            // if inputs is empty and check it's type
            if ((0, check_inputs_1.default)(name, "string", "name")) {
                res.status(400).json({ message: (0, check_inputs_1.default)(name, "string", "name") });
                return;
            }
            if ((0, check_inputs_1.default)(email, "string", "email")) {
                res.status(400).json({ message: (0, check_inputs_1.default)(email, "string", "email") });
                return;
            }
            if ((0, check_inputs_1.default)(password, "string", "password")) {
                res.status(400).json({ message: (0, check_inputs_1.default)(password, "string", "password") });
                return;
            }
            if ((0, check_inputs_1.default)(phone, "string", "phone")) {
                res.status(400).json({ message: (0, check_inputs_1.default)(phone, "string", "phone") });
                return;
            }
            // hash the password
            const host = `${req.protocol}://${req.get('host')}`;
            axios_1.default.get(`${host}/usersForBackend/email/${email}`, {
                headers: {
                    Authorization: `Bearer ${(0, encode_1.default)({}, process.env.BACKEND_KEY, 5)}`
                },
            }).then((response) => __awaiter(this, void 0, void 0, function* () {
                const data = response.data;
                if (data.length > 0) {
                    res.status(400).json({ message: "email is exist" });
                    return;
                }
                // create the connection
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                let connection = (0, Conn_1.createConnection)();
                connection.connect();
                // Insert new user if email does not exist
                connection.query(`INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`, [name, email, hashedPassword, phone], (err, result) => {
                    connection.end();
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }
                    const user = {
                        id: result.insertId,
                        name,
                        email,
                        phone,
                    };
                    // genrate access token
                    const token = (0, encode_1.default)({ userID: user.id }, process.env.SECRET_KEY, process.env.SECRET_KEY_EXPIRE_IN);
                    // genrate refresh token
                    const refreshToken = (0, encode_1.default)({ userID: user.id }, process.env.REFRESH_KEY, process.env.REFRESH_KEY_EXPIRE_IN);
                    res.cookie("jwt", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: (0, time_convert_1.default)(4, "mo", "mi")
                    });
                    res.status(201).json({ data: user, token });
                });
            })).catch((err) => {
                res.status(500).json({ message: err.message });
            });
        }
        catch (err) {
            res.status(400).json(err);
        }
    });
}
exports.default = register;
