"use strict";
// check type
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.checkType = void 0;
function checkType(field, type) {
    return typeof field === type;
}
exports.checkType = checkType;
// is empty
function isEmpty(field) {
    return field === undefined || field === null || field === '' || (Array.isArray(field) && field.length === 0);
}
exports.isEmpty = isEmpty;
function checkInputs(field, type, fieldName) {
    if (isEmpty(field)) {
        return `${fieldName} can't be empty`;
    }
    if (!checkType(field, type)) {
        return `${fieldName} must be ${type}`;
    }
    return;
}
exports.default = checkInputs;
