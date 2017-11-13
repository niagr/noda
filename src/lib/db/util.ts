import {Model} from './model'
import { FieldSpec } from './index';
import { pickKeys, mapKeys } from '../util';

interface ModelWithName extends Model {
    name: string
}

export function createMigrations(newModels: ModelWithName[], oldModels: ModelWithName[]) {
    const modelDict = pairByName(oldModels, newModels)

    const newModelsList = pickKeys(modelDict, k => !modelDict[k].old)
    const commonModelsList = pickKeys(modelDict, k => !!(modelDict[k].new && modelDict[k].old))

    const commonModelsDiff = mapKeys(commonModelsList, (modelName, model) => {
        const diff = modelDiff(model.old!, model.new!)
        const fieldDiffs = mapKeys(diff.commonFields, fieldName =>
            fieldDiff(diff.commonFields[fieldName].old, diff.commonFields[fieldName].new))
        const changedFields = pickKeys(fieldDiffs, f => (
            fieldDiffs[f].default.from != fieldDiffs[f].default.to ||
            fieldDiffs[f].nullable.from != fieldDiffs[f].nullable.to ||
            fieldDiffs[f].type.from != fieldDiffs[f].type.to
        ))
        return {
            newFields: diff.newFields,
            removedFields: diff.removedFields,
            changedFields: mapKeys(changedFields, k => trimFieldDiff(changedFields[k]))
        }
    })

    const x = {newModelsList, commonModelsDiff}
    return JSON.stringify(x, null, 4)
}

const fieldDiff = <T, U>(f1: FieldSpec<T>, f2: FieldSpec<U>) => ({ 
    type: {from: f1.typeName, to: f2.typeName},
    default: {from: f1.default, to: f2.default},
    nullable: {from: f1.nullable, to: f2.nullable}
})

const trimFieldDiff = (fd: any) => pickKeys(fd, f => fd[f].from !== fd[f].to)

const modelDiff = (m1: Model, m2: Model) => ({
    commonFields: mapKeys(pickKeys(m2.fields, f => f in m1.fields), f => ({new: m2.fields[f], old: m1.fields[f]})),
    newFields: pickKeys(m2.fields, f => !(f in m1.fields)),
    removedFields: pickKeys(m1.fields, f => !(f in m2.fields))
})

type ThingWithName = {name: string}
type OldNewPair <T extends ThingWithName> = {old?: T, new?: T}
function pairByName <T extends ThingWithName> (l1: T[], l2: T[]){
    const res: {[k: string]: OldNewPair<T>} = {}
    for (const x of l1) {
        res[x.name] = res[x.name] || {}
        res[x.name].old = x
    }
    for (const x of l2) {
        res[x.name] = res[x.name] || {}
        res[x.name].new = x
    }
    return res
}