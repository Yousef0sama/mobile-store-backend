"use strict";
// imports
Object.defineProperty(exports, "__esModule", { value: true });
function logout(req, res) {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
            res.sendStatus(204); // no content
            return;
        }
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: false
        });
        res.status(200).json({ massage: "logged out!" });
    }
    catch (err) {
        res.status(400).json(err);
    }
}
exports.default = logout;
