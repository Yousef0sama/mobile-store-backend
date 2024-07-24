"use strict";
// imports
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Conn_1 = require("../../../../../config/db/Conn");
function getUserByEmail(req, res) {
    try {
        // get email
        const { email } = req.params;
        // check if email is exist
        if (!email) {
            res.sendStatus(204);
            return;
        }
        // connect to db
        const connection = (0, Conn_1.createConnection)();
        connection.connect((err) => {
            res.status(500).json(err);
            console.log(err);
            return;
        });
        // get user from database
        connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
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
exports.default = getUserByEmail;
