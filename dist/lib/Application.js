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
const http = require("http");
class Application {
    constructor(router) {
        this.mainRouter = router;
    }
    start(port) {
        http.createServer((req, resp) => __awaiter(this, void 0, void 0, function* () {
            for (const route of this.mainRouter.routeList) {
                if (req.url == route.pattern) {
                    const response = yield route.callbackOrRouter(req);
                    resp.statusCode = 200;
                    resp.end(response.body);
                    return;
                }
            }
            resp.statusCode = 404;
            resp.end();
        })).listen(port);
    }
}
exports.default = Application;
