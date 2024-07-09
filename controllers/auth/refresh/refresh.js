"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// db
const Conn_1 = require("../../../config/db/Conn");
function default_1(req, res) {
    const cookies = req.cookies;
    // check if JWT cookie is declared
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        res.status(401).json({ masssage: "unauthorized please login or sign up" });
    const refreshToken = cookies.jwt;
    // check if refresh token is true and check it's expires date
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
        if (err)
            return res.status(403).json({ massage: "forbidden not allowed to visit this site" });
        const connection = (0, Conn_1.createConnection)();
        connection.connect();
        // check if decoded is jwt payload and get user id from it
        if (typeof decoded !== "string" && (decoded === null || decoded === void 0 ? void 0 : decoded.userID)) {
            var userId = decoded.userID;
        }
        else {
            return res.status(403).json({ masssage: "forbidden not allowed to visit this page" });
        }
        // get user data
        connection.query(`SELECT * FROM users WHERE u_id = ?`, [userId], (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            // check if user in database
            if (results.length === 0) {
                return res.status(401).json({ masssage: "unauthorized please login or sign up" });
            }
            // return new access token
            const token = jsonwebtoken_1.default.sign({ userID: userId }, process.env.SECRET_KEY, {
                expiresIn: process.env.SECRET_KEY_EXPIRE_IN
            });
            res.status(200).json({ token });
        });
    });
}
exports.default = default_1;
