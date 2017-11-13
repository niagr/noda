export const pickKeys = <T>(x: {[k: string]: T}, predicate: (k: string) => boolean) =>
    Object.keys(x)
    .filter(predicate)
    .reduce((obj, k) => ({...obj, ...{[k]: x[k]}}), {} as {[k: string]: T})


export const mapKeys = <T, U>(x: {[k: string]: T}, mapper: (k: string, v: T) => U) => 
    Object.keys(x)
    .map(k => ({key: k, val: mapper(k, x[k])}))
    .reduce((obj, x) => ({...obj, ...{[x.key]: x.val}}), {} as {[k: string]: U})