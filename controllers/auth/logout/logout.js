"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logout(req, res) {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204); // no content
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: false
    });
    res.status(200).json({ massage: "logged out!" });
}
exports.default = logout;
