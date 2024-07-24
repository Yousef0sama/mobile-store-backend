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
function updateCard(req, res) {
    try {
        // vars
        const { id, address_id, cardNumber, expiredDate, cvv, cardType, bank } = req.body;
        const visaExpiredDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3,4}$/;
        const cardNumberRegex = /^\d{16}$/;
        const validCardTypes = ["credit", "debit", "prepaid"];
        // check inputs
        if ((0, check_inputs_1.default)(id, "number", "id")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(id, "number", "id") });
            return;
        }
        if (!(0, check_inputs_1.isEmpty)(address_id)) {
            if (!(0, check_inputs_1.checkType)(address_id, "number")) {
                res.status(400).json({ message: "address_id must be number" });
                return;
            }
        }
        if (!(0, check_inputs_1.isEmpty)(cardNumber)) {
            if (!(0, check_inputs_1.checkType)(cardNumber, "string")) {
                res.status(400).json({ message: "card number must be string" });
                return;
            }
            if (cardNumberRegex.test(cardNumber)) {
                res.status(400).json({ message: "card number not valid" });
                return;
            }
        }
        if (!(0, check_inputs_1.isEmpty)(expiredDate)) {
            if (!(0, check_inputs_1.checkType)(expiredDate, "string")) {
                res.status(400).json({ message: "expire date must be string" });
                return;
            }
            if (visaExpiredDateRegex.test(expiredDate)) {
                res.status(400).json({ message: "expired date not valid it must be like \"mm\\yy\"" });
                return;
            }
        }
        if (!(0, check_inputs_1.isEmpty)(cvv)) {
            if (!(0, check_inputs_1.checkType)(cvv, "string")) {
                res.status(400).json({ message: "cvv must be string" });
                return;
            }
            if (cvvRegex.test(cvv)) {
                res.status(400).json({ message: "cvv not valid it must have only digits and it's length be 3 or 4" });
                return;
            }
        }
        if (!(0, check_inputs_1.isEmpty)(cardType)) {
            if (!(0, check_inputs_1.checkType)(cardType, "string")) {
                res.status(400).json({ message: "card type must be string" });
                return;
            }
            if (!validCardTypes.includes(cardType)) {
                res.status(400).json({ message: "card type must be one of [credit, debit, prepaid]" });
                return;
            }
        }
        if (!(0, check_inputs_1.isEmpty)(bank)) {
            if (!(0, check_inputs_1.checkType)(bank, "string")) {
                res.status(400).json({ message: "bank must be number" });
                return;
            }
        }
        let sqlInputs = ``;
        // if address_id add address_id
        sqlInputs += `${address_id ? `address_id =  '${address_id}'` : ""}`;
        // if cardNumber add cardNumber
        sqlInputs += `${cardNumber ? `${sqlInputs.length > 0 ? "," : ""} card_number =  '${cardNumber}'` : ""}`;
        // if city add city
        sqlInputs += `${expiredDate ? `${sqlInputs.length > 0 ? "," : ""} expire_date =  '${expiredDate}'` : ""}`;
        // if street add street
        sqlInputs += `${cvv ? `${sqlInputs.length > 0 ? "," : ""} cvv =  '${cvv}'` : ""}`;
        // if otherStreet add otherStreet
        sqlInputs += `${cardType ? `${sqlInputs.length > 0 ? "," : ""} card_type =  '${cardType}'` : ""}`;
        // if zip add zip
        sqlInputs += `${bank ? `${sqlInputs.length > 0 ? "," : ""} bank =  '${bank}'` : ""}`;
        if (sqlInputs.length === 0) {
            res.status(204).json({ message: "no data to update" });
            return;
        }
        let connection = (0, Conn_1.createConnection)();
        connection.connect();
        connection.query(`UPDATE cards SET ${sqlInputs} WHERE card_id = ${id}`, (err) => {
            connection.end();
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json({ message: "data updated!" });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = updateCard;
