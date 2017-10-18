import * as http from 'http'

import Application from './lib/Application'

import {mainRouter} from './routes'

const app = new Application(mainRouter)
app.start(8080)
