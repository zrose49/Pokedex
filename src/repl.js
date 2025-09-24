"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanInput = cleanInput;
function cleanInput(string) {
    var splitString = string.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');
    console.log(splitString);
    return splitString;
}
//export {};
