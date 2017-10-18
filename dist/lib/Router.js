"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(pattern, callbackOrRouter) {
        this.pattern = '';
        this.pattern = pattern;
        this.callbackOrRouter = callbackOrRouter;
    }
}
exports.Route = Route;
class ResolvedRoute extends Route {
    constructor(pattern, callback) {
        super(pattern, callback);
    }
}
class Router {
    constructor(routeList) {
        this.routeList = [];
        this.routeList = Router.resolveRoutes(routeList);
    }
    static resolveRoutes(routes) {
        return routes.reduce((list, route) => list.concat(route.callbackOrRouter instanceof Router ?
            Router.resolveRoutes(route.callbackOrRouter.routeList)
                .map(r => new ResolvedRoute(route.pattern + r.pattern, r.callbackOrRouter))
            :
                new ResolvedRoute(route.pattern, route.callbackOrRouter)), []);
    }
}
exports.Router = Router;
