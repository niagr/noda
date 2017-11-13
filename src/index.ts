import * as http from 'http'

import Application from './lib/Application'
import {Model, ModelInstance, ModelManager, SQLString, SQLForeignKey, createMigrations} from './lib/db'

import {mainRouter} from './routes'
import {Person, PersonWithSlaveDog} from './models'


// let PersonManager = new ModelManager(Person)
// let p = PersonManager.create({name: 'Nishant'})
// p.name = 'Abhishek'
// PersonManager.save(p)
// const app = new Application(mainRouter)
// app.start(8080)

const x = createMigrations([PersonWithSlaveDog], [Person])
console.log(x)