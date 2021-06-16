import { Fixed } from './types'

export function optionalCheck<T>(val: any, defalt: T | undefined, res: Fixed<T>): Fixed<T> {
  if (defalt === undefined && val === undefined) return {}

  return res
}

export function objectForEach<T>(obj: T, cb: (key: keyof T, val: T[typeof key]) => void) {
  for (const key in obj) {
    cb(key, obj[key])
  }
}

export function isObject(val: any) {
  return val === Object(val);
}

export function isArray(val: any) {
  return Array.isArray(val)
}