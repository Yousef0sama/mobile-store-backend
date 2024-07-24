"use strict";
// imports
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
// db
const Conn_1 = require("../../../config/db/Conn");
// functions
const check_inputs_1 = __importStar(require("../../../functions/check_inputs/check_inputs"));
const encode_1 = __importDefault(require("../../../functions/jwt/encode/encode"));
function updateAddress(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get user id
            // it's added in req.user in verifyJWT middle ware
            let userId = req.user;
            if (!userId) {
                res.status(401).json({ massage: "unauthorized please login or sign up" });
                return;
            }
            const { id, country = "", state = "", city = "", street = "", otherStreet, zip } = req.body;
            // check inputs
            if ((0, check_inputs_1.default)(id, "number", "id")) {
                res.status(400).json({ message: (0, check_inputs_1.default)(id, "number", "id") });
                return;
            }
            if (!(0, check_inputs_1.isEmpty)(country)) {
                if (!(0, check_inputs_1.checkType)(country, "string")) {
                    res.status(400).json({ message: "country must be string" });
                    return;
                }
            }
            if (!(0, check_inputs_1.isEmpty)(state)) {
                if (!(0, check_inputs_1.checkType)(state, "string")) {
                    res.status(400).json({ message: "state must be string" });
                    return;
                }
            }
            if (!(0, check_inputs_1.isEmpty)(city)) {
                if (!(0, check_inputs_1.checkType)(city, "string")) {
                    res.status(400).json({ message: "city must be string" });
                    return;
                }
            }
            if (!(0, check_inputs_1.isEmpty)(street)) {
                if (!(0, check_inputs_1.checkType)(street, "string")) {
                    res.status(400).json({ message: "street must be string" });
                    return;
                }
            }
            if (!(0, check_inputs_1.isEmpty)(otherStreet)) {
                if (!(0, check_inputs_1.checkType)(otherStreet, "string")) {
                    res.status(400).json({ message: "other street must be string" });
                    return;
                }
            }
            if (!(0, check_inputs_1.isEmpty)(zip)) {
                if (!(0, check_inputs_1.checkType)(zip, "number")) {
                    res.status(400).json({ message: "zip must be number" });
                    return;
                }
            }
            let isAddressIdExist = false;
            const host = `${req.protocol}://${req.get('host')}`;
            yield axios_1.default.get(`${host}/addressForBackend/id/${id}`, {
                headers: {
                    Authorization: `Bearer ${(0, encode_1.default)({}, process.env.BACKEND_KEY, 5)}`
                }
            }).then((response) => {
                const result = response.data;
                isAddressIdExist = result.length > 0;
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ message: err.message });
            });
            if (!isAddressIdExist) {
                res.status(400).json({ message: "address id not found" });
            }
            let sqlInputs = ``;
            // if country add country
            sqlInputs += `${country ? `country =  '${country}'` : ""}`;
            // if state add state
            sqlInputs += `${state ? `${sqlInputs.length > 0 ? "," : ""} state =  '${state}'` : ""}`;
            // if city add city
            sqlInputs += `${city ? `${sqlInputs.length > 0 ? "," : ""} city =  '${city}'` : ""}`;
            // if street add street
            sqlInputs += `${street ? `${sqlInputs.length > 0 ? "," : ""} street =  '${street}'` : ""}`;
            // if otherStreet add otherStreet
            sqlInputs += `${otherStreet ? `${sqlInputs.length > 0 ? "," : ""} otherStreet =  '${otherStreet}'` : ""}`;
            // if zip add zip
            sqlInputs += `${zip ? `${sqlInputs.length > 0 ? "," : ""} zip =  '${zip}'` : ""}`;
            if (sqlInputs.length === 0) {
                res.status(204).json({ message: "no data to update" });
                return;
            }
            let connection = (0, Conn_1.createConnection)();
            connection.connect();
            connection.query(`UPDATE addresses SET ${sqlInputs} WHERE address_id = ${id}`, (err) => {
                connection.end();
                if (err) {
                    res.status(500).json(err);
                }
                res.status(200).json({ message: "data updated!" });
            });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    });
}
exports.default = updateAddress;
