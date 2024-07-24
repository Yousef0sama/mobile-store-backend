"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyAuthJWT(req, res, next) {
    try {
        // get access token
        const authHeader = req.headers.authorization || req.headers.Authorization;
        // check if it starts with "Bearer "
        if (typeof authHeader === "string" && !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
            res.status(401).json({ message: "unauthorized please login or sign up" });
            return;
        }
        // get the token from strig
        // string be like : "Bearer {token}" after spilt be like ["Bearer", "{token}"]
        let token = "";
        if (typeof authHeader === "string") {
            token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        }
        // check if token is true and check expire date
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // if token expired or it was wrong return forbidden
            if (err) {
                res.status(403).json({ masssage: "forbidden not allowed to visit this page" });
                return;
            }
            // check if it has user id and it's type is jwt payload and if not return for bidden
            if (typeof decoded !== "string" && (decoded === null || decoded === void 0 ? void 0 : decoded.userID)) {
                req.user = decoded.userID;
                next();
            }
            else {
                res.status(403).json({ message: "forbidden not allowed to visit this page" });
                return;
            }
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = verifyAuthJWT;
