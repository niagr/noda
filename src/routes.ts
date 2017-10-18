import {Router, Route} from './lib/Router'

import {helloHandler, worldHandler} from './handlers'

export const mainRouter = new Router([
    new Route('/hello', helloHandler),
    new Route('/world', worldHandler)
])