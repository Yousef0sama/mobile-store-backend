"use strict";
// imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Conn_1 = require("../../../config/db/Conn");
// functions
const check_inputs_1 = __importDefault(require("../../../functions/check_inputs/check_inputs"));
const encrypt_1 = __importDefault(require("../../../functions/encrypt/encrypt"));
function addCard(req, res) {
    try {
        // get user
        // user added in req in verify jwt middle ware
        const userId = req.user;
        if (!userId) {
            res.status(401).json({ massage: "unauthorized please login or sign up" });
            return;
        }
        // vars
        const { addressId, cardNumber, expiredDate, cvv, cardType, bank } = req.body;
        const visaExpiredDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3,4}$/;
        const cardNumberRegex = /^\d{16}$/;
        const validCardTypes = ["credit", "debit", "prepaid"];
        // check inputs
        if ((0, check_inputs_1.default)(addressId, "number", "address id")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(addressId, "number", "address id") });
            return;
        }
        if ((0, check_inputs_1.default)(cardNumber, "string", "card number")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(cardNumber, "string", "card number") });
            return;
        }
        if (!cardNumberRegex.test(cardNumber)) {
            res.status(400).json({ message: "card number not valid" });
            return;
        }
        if ((0, check_inputs_1.default)(expiredDate, "string", "expired date")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(expiredDate, "string", "expired date") });
            return;
        }
        if (!visaExpiredDateRegex.test(expiredDate)) {
            res.status(400).json({ message: "expired date not valid it must be like 'mm / yy'" });
            return;
        }
        if ((0, check_inputs_1.default)(cvv, "string", "cvv")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(cvv, "string", "cvv") });
            return;
        }
        if (!cvvRegex.test(cvv)) {
            res.status(400).json({ message: "cvv not valid it must have only digits and it's length be 3 or 4" });
            return;
        }
        if ((0, check_inputs_1.default)(cardType, "string", "card type")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(cardType, "string", "card type") });
            return;
        }
        if (!validCardTypes.includes(cardType)) {
            res.status(400).json({ message: "card type must be one of [credit, debit, prepaid]" });
            return;
        }
        if ((0, check_inputs_1.default)(bank, "string", "bank")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(bank, "string", "bank") });
            return;
        }
        // vars
        const encryptedCardNumber = (0, encrypt_1.default)(cardNumber);
        const encryptedCvv = (0, encrypt_1.default)(cvv);
        const card = {
            userId: userId,
            addressId: addressId,
            cardNumber: encryptedCardNumber,
            expiredDate: expiredDate,
            cvv: encryptedCvv,
            cardType: cardType,
            bank: bank
        };
        // connect to db
        const connection = (0, Conn_1.createConnection)();
        connection.connect();
        connection.query(`INSERT INTO cards (user_id, address_id, card_number, expire_date, cvv, card_type, bank) VALUES (?, ?, ?, ?, ?, ?, ?)`, [card.userId, card.addressId, card.cardNumber, card.expiredDate, card.cvv, card.cardType, card.bank], (err) => {
            connection.end();
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json({ message: "data inserted!" });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = addCard;
