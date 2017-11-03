import {FieldSpec, FieldSpecOptions, Model, ModelInstance} from './model'

export class SQLString extends FieldSpec<string> {
    typeName: 'STRING' = 'STRING'
    primitiveType: string
}

interface SQLForeignKeyFieldSpecOptions<M extends Model> extends FieldSpecOptions<undefined> {
    to: M
}

export class SQLForeignKey<M extends Model> extends FieldSpec<undefined> {
    typeName: 'FOREIGNKEY'|'SELFFOREIGNKEY' = 'FOREIGNKEY'
    primitiveType: ModelInstance<M>
    to: M
    constructor(spec: Pick<SQLForeignKeyFieldSpecOptions<M>, 'to'> & Partial<SQLForeignKeyFieldSpecOptions<M>>) {
        super(spec)
        this.to = spec.to
    }
}
