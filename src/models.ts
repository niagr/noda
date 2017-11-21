import {Model, SQLString, SQLForeignKey, ModelInstance} from './lib/db'


export const Animal = {

    name: "Animal",

    fields: {
        collarID: new SQLString()
    },
    methods: {

    }
}

export const Person = {

    name: 'Person',
    
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

export const PersonWithSlaveDog = {

    name: 'Person',
    
    fields: {
        name: new SQLString({nullable: false}),
        pet: new SQLForeignKey({to: Animal}),
        slaveDog: new SQLForeignKey({to: Animal})
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
