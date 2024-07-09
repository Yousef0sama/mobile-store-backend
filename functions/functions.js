"use strict";
// check type
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeConvert = exports.isEmpty = exports.checkType = void 0;
function checkType(field, type) {
    return typeof field === type;
}
exports.checkType = checkType;
// is empty
function isEmpty(field) {
    if (field)
        return false;
    return true;
}
exports.isEmpty = isEmpty;
function timeConvert(val, from, to) {
    let converts = {
        "y": 365 * 24 * 60 * 60 * 1000,
        "mo": 30 * 24 * 60 * 60 * 1000,
        "w": 7 * 24 * 60 * 60 * 1000,
        "d": 24 * 60 * 60 * 1000,
        "h": 60 * 60 * 1000,
        "m": 60 * 1000,
        "s": 1000,
        "mi": 1
    };
    let fromMilliseconds = val * converts[from];
    let result = fromMilliseconds / converts[to];
    return result;
}
exports.timeConvert = timeConvert;
