import * as http from 'http'

import Application from './lib/Application'
import {Model, ModelInstance, ModelManager, SQLString, SQLForeignKey} from './lib/db'

import {mainRouter} from './routes'

const Animal = {
    fields: {
        collarID: new SQLString()
    },
    methods: {

    }
}


const Person = {
    
    fields: {
        name: new SQLString({nullable: true}),
        pet: new SQLForeignKey({to: Animal})
    },
    
    self: {
        child: {nullable: true}
    },

    methods: {
        getName(): string {
            const self = this as ModelInstance<typeof Person>
            return self.name
        }
    }
    
}

let PersonManager = new ModelManager(Person)
let p = PersonManager.create({name: 'Nishant'})
PersonManager.save(p)

p.child.child.child

const app = new Application(mainRouter)
app.start(8080)
