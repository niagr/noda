"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./lib/Router");
const handlers_1 = require("./handlers");
const Response_1 = require("./lib/Response");
const nishantRouter = new Router_1.Router([
    new Router_1.Route('/hello', (req) => __awaiter(this, void 0, void 0, function* () { return new Response_1.default('hello, nishant', 200); })),
    new Router_1.Route('/hola', (req) => __awaiter(this, void 0, void 0, function* () { return new Response_1.default('hola, nishant', 200); }))
]);
exports.mainRouter = new Router_1.Router([
    new Router_1.Route('/hello', handlers_1.helloHandler),
    new Router_1.Route('/world', handlers_1.worldHandler),
    new Router_1.Route('/nishant', nishantRouter)
]);
