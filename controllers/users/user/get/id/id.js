"use strict";
// imports
Object.defineProperty(exports, "__esModule", { value: true });
// imports
// db
const Conn_1 = require("../../../../../config/db/Conn");
function getUserById(req, res) {
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
        // get user from database
        connection.query(`SELECT u_id, name, email, role, phone, img FROM users WHERE u_id = '${id}'`, (err, result) => {
            connection.end();
            if (err) {
                res.status(500).json(err);
            }
            const user = result;
            res.json(user);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = getUserById;
