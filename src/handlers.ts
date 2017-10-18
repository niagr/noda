import * as http from 'http'

import Response from './lib/Response'

type Request = http.IncomingMessage

export const helloHandler = async (req: Request) => new Response('hello!', 200)
export const worldHandler = async (req: Request) => new Response('world!', 200)

