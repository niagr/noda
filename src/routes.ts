import {Router, Route} from './lib/Router'

import {helloHandler, worldHandler} from './handlers'
import Response from './lib/Response'

const nishantRouter = new Router([
    new Route('/hello', async req => new Response('hello, nishant', 200)),
    new Route('/hola', async req => new Response('hola, nishant', 200))
])

export const mainRouter = new Router([
    new Route('/hello', helloHandler),
    new Route('/world', worldHandler),
    new Route('/nishant', nishantRouter)
])
