"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./lib/Application");
const routes_1 = require("./routes");
const app = new Application_1.default(routes_1.mainRouter);
app.start(8080);
