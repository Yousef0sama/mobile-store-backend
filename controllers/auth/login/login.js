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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// db
const Conn_1 = require("../../../config/db/Conn");
// functions
const functions_1 = require("../../../functions/functions");
function login(req, res) {
    try {
        const { email, password } = req.body;
        // check inputs
        if (!(0, functions_1.checkType)(email, "string") || (0, functions_1.isEmpty)(email)) {
            res.status(400).json({ masssage: "email can't be empty and must be string" });
            return;
        }
        if (!(0, functions_1.checkType)(password, "string") || (0, functions_1.isEmpty)(password)) {
            res.status(400).json({ masssage: "password can't be empty and must be string" });
            return;
        }
        // connect to db
        let connection = (0, Conn_1.createConnection)();
        connection.connect();
        // get user
        connection.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(500).json(err);
                connection.end();
                return;
            }
            // check if user found
            if (result.length < 1) {
                res.status(400).json({ masssage: "wrong email or password" });
                connection.end();
                return;
            }
            const hashedPassword = result[0].password;
            const passwordMatch = yield bcrypt_1.default.compare(password, hashedPassword);
            if (passwordMatch) {
                // user data
                const user = {
                    id: result[0].u_id,
                    name: result[0].name,
                    email: result[0].email,
                    phone: result[0].phone
                };
                // generate token
                const token = jsonwebtoken_1.default.sign({ userID: user.id }, process.env.SECRET_KEY, {
                    expiresIn: process.env.SECRET_KEY_EXPIRE_IN
                });
                // genrate refresh token
                const refreshToken = jsonwebtoken_1.default.sign({ userID: user.id }, process.env.REFRESH_KEY, {
                    expiresIn: process.env.REFRESH_KEY_EXPIRE_IN
                });
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: (0, functions_1.timeConvert)(4, "mo", "mi")
                });
                res.json({ data: user, token: token });
            }
            else {
                res.status(400).json({ masssage: "wrong email or password" });
            }
            connection.end();
        }));
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = login;
