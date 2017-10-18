import * as http from 'http'

import Response from './Response'

type RouteCallback = (req: http.IncomingMessage) => Promise<Response>

export class Route {
    
    public readonly pattern: string = ''
    
    public readonly callbackOrRouter: RouteCallback | Router

    constructor(pattern: string, callbackOrRouter: RouteCallback | Router) {
        this.pattern = pattern
        this.callbackOrRouter = callbackOrRouter
    }
    
}

class ResolvedRoute extends Route {
    public readonly callbackOrRouter: RouteCallback
    constructor(pattern: string, callback: RouteCallback) {
        super(pattern, callback)
    }
}

export class Router {
    readonly routeList: ResolvedRoute[] = []
    
    constructor(routeList: Route[]) {
        this.routeList = Router.resolveRoutes(routeList)
    }

    private static resolveRoutes(routes: Route[]): ResolvedRoute[] {
        return routes.reduce<ResolvedRoute[]>((list, route) => 
            list.concat(
                route.callbackOrRouter instanceof Router ?
                    Router.resolveRoutes(route.callbackOrRouter.routeList)
                        .map(r => new ResolvedRoute(route.pattern + r.pattern, r.callbackOrRouter))
                :
                    new ResolvedRoute(route.pattern, route.callbackOrRouter)
            )
        , [])
    }
}
