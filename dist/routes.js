"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./lib/Router");
const handlers_1 = require("./handlers");
exports.mainRouter = new Router_1.Router([
    new Router_1.Route('/hello', handlers_1.helloHandler),
    new Router_1.Route('/world', handlers_1.worldHandler)
]);
