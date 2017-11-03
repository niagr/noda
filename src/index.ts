import * as http from 'http'

import Application from './lib/Application'
import {Model, ModelInstance, ModelManager, SQLString, SQLForeignKey} from './lib/db'

import {mainRouter} from './routes'
import {Person} from './models'


let PersonManager = new ModelManager(Person)
let p = PersonManager.create({name: 'Nishant'})
p.name = 'Abhishek'
PersonManager.save(p)

const app = new Application(mainRouter)
app.start(8080)
