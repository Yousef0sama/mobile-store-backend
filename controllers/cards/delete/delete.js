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
function deleteCard(req, res) {
    try {
        const { id } = req.body;
        if ((0, check_inputs_1.default)(id, "number", "id")) {
            res.status(400).json({ message: (0, check_inputs_1.default)(id, "number", "id") });
            return;
        }
        let connection = (0, Conn_1.createConnection)();
        connection.connect();
        connection.query(`DELETE FROM cards WHERE card_id = ${id}`, (err) => {
            connection.end();
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json({ message: "data deleted" });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = deleteCard;
