"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(body, statusCode) {
        this.body = body;
        this.statusCode = statusCode;
    }
}
exports.default = Response;
class NotFoundResponse extends Response {
    constructor(body) {
        super(body, 404);
    }
}
exports.NotFoundResponse = NotFoundResponse;
