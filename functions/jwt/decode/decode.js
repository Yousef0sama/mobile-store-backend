"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function decodeJWT(token) {
    const data = jsonwebtoken_1.default.decode(token);
    if (data) {
        return data;
    }
    return "";
}
exports.default = decodeJWT;
