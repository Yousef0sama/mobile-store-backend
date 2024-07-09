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
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phone } = req.body;
            // if inputs is empty and check it's type
            if (!(0, functions_1.checkType)(name, "string") || (0, functions_1.isEmpty)(name)) {
                res.status(400).json({ masssage: "name can't be empty and must be string" });
                return;
            }
            if (!(0, functions_1.checkType)(email, "string") || (0, functions_1.isEmpty)(email)) {
                res.status(400).json({ masssage: "email can't be empty and must be string" });
                return;
            }
            if (!(0, functions_1.checkType)(password, "string") || (0, functions_1.isEmpty)(password)) {
                res.status(400).json({ masssage: "password can't be empty and must be string" });
                return;
            }
            if (!(0, functions_1.checkType)(phone, "string") || (0, functions_1.isEmpty)(phone)) {
                res.status(400).json({ masssage: "phone can't be empty and must be string" });
                return;
            }
            // hash the password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // create the connection
            let connection = (0, Conn_1.createConnection)();
            connection.connect();
            // Check if email already exists
            connection.query(`SELECT email FROM users WHERE email = ?`, [email], (err, result) => {
                if (err) {
                    res.status(500).json(err);
                    connection.end();
                    return;
                }
                if (result.length > 0) {
                    res.status(400).json({ masssage: "email is already exist" });
                    connection.end();
                    return;
                }
                // Insert new user if email does not exist
                connection.query(`INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`, [name, email, hashedPassword, phone], (err, result) => {
                    connection.end();
                    const user = {
                        id: result.insertId,
                        name,
                        email,
                        phone,
                    };
                    // genrate access token
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
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        res.status(201).json({ data: user, token });
                    }
                });
            });
        }
        catch (err) {
            res.status(400).json(err);
        }
    });
}
exports.default = register;
