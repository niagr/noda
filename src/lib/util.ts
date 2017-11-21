export const pickKeys = <T>(x: {[k: string]: T}, predicate: (k: string) => boolean) =>
    Object.keys(x)
    .filter(predicate)
    .reduce((obj, k) => ({...obj, ...{[k]: x[k]}}), {} as {[k: string]: T})


export function mapKeys <T, U> (x: {[k: string]: T}, mapper: (k: string, v: T) => U): {[k:string]: U} {
    return Object.keys(x)
        .map(k => ({key: k, val: mapper(k, x[k])}))
        .reduce((obj, x) => ({...obj, ...{[x.key]: x.val}}), {} as {[k: string]: U})
}

export function compose<T>(initVal: T, ...funcs: ((x: T) => T)[]): T
export function compose<A, B>(initVal: A, f1: (x: A) => B): B
export function compose<A, B, C>(initVal: A, f1: (x: A) => B, f2: (x: B) => C): C
export function compose<A, B, C, D>(initVal: A, f1: (x: A) => B, f2: (x: B) => C, f3: (x: C) => D): D
export function compose(initVal: any, ...funcs: ((x: any) => any)[]) {
    return funcs.reduce((a, f) => f(a), initVal)
}

function mapObject<T, U>(x: T, mapper: (k: keyof T, v: T[keyof T]) => U): {[k in keyof T]: U} {
    return (Object.keys(x) as Array<keyof T>)
        .map(k => ({key: k, val: mapper(k, x[k])}))
        .reduce((obj, x) => ({...obj, ...{[x.key]: x.val}}), {} as any)
}

class Monad<T> {

    private v: T

    constructor (v: T) {
        this.v = v
    }

    then<U> (cb: (v: T) => U): Monad<U> {
        return new Monad(cb(this.v))
    }

    value (): T {
        return this.v
    }

}

function chain<T> (v: T) {
    return new Monad(v)
}
