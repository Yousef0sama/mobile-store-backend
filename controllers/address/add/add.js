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
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Conn_1 = require("../../../config/db/Conn");
// functions
const check_inputs_1 = __importStar(require("../../../functions/check_inputs/check_inputs"));
function addAddress(req, res) {
    try {
        // get user id
        // it's added in req.user in verifyJWT middle ware
        let userId = req.user;
        if (!userId) {
            res.status(401).json({ massage: "unauthorized please login or sign up" });
            return;
        }
        const { country, state, city, street, otherStreet = null, zip } = req.body;
        // check inputs
        if ((0, check_inputs_1.default)(country, "string", "country")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(country, "string", "country") });
            return;
        }
        if ((0, check_inputs_1.default)(state, "string", "state")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(state, "string", "state") });
            return;
        }
        if ((0, check_inputs_1.default)(city, "string", "city")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(city, "string", "city") });
            return;
        }
        if ((0, check_inputs_1.default)(street, "string", "street")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(street, "string", "street") });
            return;
        }
        if (!(0, check_inputs_1.isEmpty)(otherStreet)) {
            if (!(0, check_inputs_1.checkType)(otherStreet, "string")) {
                res.status(400).json({ message: "other street must be string" });
                return;
            }
        }
        if ((0, check_inputs_1.default)(zip, "number", "zip")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(zip, "number", "zip") });
            return;
        }
        // connect to database
        let connection = (0, Conn_1.createConnection)();
        connection.connect();
        connection.query(`INSERT INTO addresses (user_id, country, state, city, street, otherStreet, zip) VALUES (?, ?, ?, ?, ?, ?, ?)`, [userId, country, state, city, street, otherStreet, zip], (err) => {
            connection.end();
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(201).json({ message: "data inserted!" });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = addAddress;
