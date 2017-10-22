import * as http from 'http'

import {Route, Router} from './Router'

export default class Application {

    mainRouter: Router

    constructor(router: Router) {
        this.mainRouter = router
    }

    start(port: number) {
        http.createServer(async (req, resp) => {
            for (const route of this.mainRouter.routeList) {
                if (req.url == route.pattern) {
                    const response = await route.callback(req)
                    resp.statusCode = 200
                    resp.end(response.body)
                    return
                }
            }
            resp.statusCode = 404
            resp.end()
        }).listen(port)
    }

}
