export interface FieldSpecOptions<T> {
    nullable: boolean
    default: T
}

export class FieldSpec<T> {
    typeName: 'STRING'|'NUMBER'|'FOREIGNKEY'|'SELFFOREIGNKEY'
    primitiveType: any
    nullable: boolean
    default: T
    constructor(spec?: Partial<FieldSpecOptions<T>>) {
        this.nullable = spec && spec.nullable || false
        this.default = spec && spec.default || 0 as any
    }
}

export interface Model {
    fields: {[fieldName: string]: FieldSpec<any>}
    methods: {[methodName: string]: (...args: any[]) => any}
    self?: {[fieldName: string]: Partial<FieldSpecOptions<undefined>>}
    tableName?: string
}

type ModelInstanceProps<M extends Model> = {[P in keyof M['fields']]: M['fields'][P]['primitiveType']}
                                            & {[P in keyof M['self']]: ModelInstance<M>}
type ModelInstanceMethods<M extends Model> = M['methods']
export type ModelInstance<M extends Model> = ModelInstanceProps<M> & ModelInstanceMethods<M>

export class ModelManager<M extends Model> {

    model: M

    constructor(m: M) {
        this.model = m
    }

    create(fields?: Partial<ModelInstanceProps<M>>): ModelInstance<M> {
        const instance: any = {}
        for (const field in this.model.fields) {
            instance[field] = 
                fields && fields[field] 
                || defaultValue(this.model.fields[field].primitiveType)
        }
        for (const field in this.model.methods) {
            instance[field] = this.model.methods[field]
        }
        return instance
    }

    save(instance: ModelInstance<M>) {
        
    }

}

function defaultValue(type: any) {
    return (
        typeof type === 'string' ? '' :
        typeof type === 'number' ? 0 :
        undefined
    )
}