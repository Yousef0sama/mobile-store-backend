"use strict";
// import interface
Object.defineProperty(exports, "__esModule", { value: true });
function timeConvert(val, from, to) {
    let converts = {
        "y": 365.25 * 24 * 60 * 60 * 1000,
        "mo": 30.4375 * 24 * 60 * 60 * 1000,
        "w": 7 * 24 * 60 * 60 * 1000,
        "d": 24 * 60 * 60 * 1000,
        "h": 60 * 60 * 1000,
        "m": 60 * 1000,
        "s": 1000,
        "mi": 1
    };
    let f = converts[from];
    let t = converts[to];
    let unit = f / t;
    let result = unit * val;
    return result;
}
exports.default = timeConvert;
