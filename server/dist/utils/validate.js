"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = exports.validateEmail = void 0;
function validateEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
exports.validateEmail = validateEmail;
function validatePhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== 'string') {
        return false;
    }
    return phoneNumber.length >= 6;
}
exports.validatePhoneNumber = validatePhoneNumber;
