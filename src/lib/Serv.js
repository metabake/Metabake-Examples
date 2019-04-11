"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomCors {
    constructor(orig) {
        return (request, response, next) => {
            response.setHeader('Access-Control-Allow-Origin', '*');
            return next();
        };
    }
}
exports.CustomCors = CustomCors;
module.exports = {
    CustomCors
};