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
// functions
const time_convert_1 = __importDefault(require("../../../functions/time_convert/time_convert"));
const check_inputs_1 = __importDefault(require("../../../functions/check_inputs/check_inputs"));
const encode_1 = __importDefault(require("../../../functions/jwt/encode/encode"));
function login(req, res) {
    try {
        const { email, password } = req.body;
        // check inputs
        if ((0, check_inputs_1.default)(email, "string", "email")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(email, "string", "email") });
            return;
        }
        if ((0, check_inputs_1.default)(password, "string", "password")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(password, "string", "password") });
            return;
        }
        const host = `${req.protocol}://${req.get('host')}`;
        axios_1.default.get(`${host}/usersForBackend/email/${email}`, {
            headers: {
                Authorization: `Bearer ${(0, encode_1.default)({}, process.env.BACKEND_KEY, 5)}`
            }
        }).then((response) => __awaiter(this, void 0, void 0, function* () {
            const result = response.data;
            if (result.length < 1) {
                res.status(400).json({ message: "wrong email or password" });
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
                const token = (0, encode_1.default)({ userID: user.id }, process.env.SECRET_KEY, process.env.SECRET_KEY_EXPIRE_IN);
                // genrate refresh token
                const refreshToken = (0, encode_1.default)({ userID: user.id }, process.env.REFRESH_KEY, process.env.REFRESH_KEY_EXPIRE_IN);
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: (0, time_convert_1.default)(4, "mo", "mi")
                });
                res.json({ data: user, token: token });
            }
            else {
                res.status(400).json({ message: "wrong email or password" });
            }
        })).catch((err) => {
            res.status(500).json({ message: err.message });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = login;
