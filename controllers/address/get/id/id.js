"use strict";
// imports
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Conn_1 = require("../../../../config/db/Conn");
function getAddressById(req, res) {
    try {
        // get id
        const { id } = req.params;
        // check if id is exist
        if (!id) {
            res.sendStatus(204);
            return;
        }
        // connect to db
        const connection = (0, Conn_1.createConnection)();
        connection.connect();
        // get address from database
        connection.query(`SELECT address_id, user_id, country, state, city, street, otherStreet, zip FROM addresses WHERE address_id = '${id}'`, (err, result) => {
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
exports.default = getAddressById;
