"use strict";
// imports
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Conn_1 = require("../../../../config/db/Conn");
function getAddressByUserId(req, res) {
    try {
        // get user id
        const { userId } = req.params;
        // check if user id is exist
        if (!userId) {
            res.sendStatus(204);
            return;
        }
        // connect to db
        const connection = (0, Conn_1.createConnection)();
        connection.connect();
        // get address from database
        connection.query(`SELECT address_id, user_id, country, state, city, street, otherStreet, zip FROM addresses WHERE user_id = ${userId}`, (err, result) => {
            connection.end();
            if (err) {
                res.status(500).json(err);
            }
            const address = result;
            res.json(address);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = getAddressByUserId;
