import { objectForEach, optionalCheck } from "./util"
import { NodeObject, Fixed, Errors, Schema, Validate, SchemaNode } from "./types"
import { fix } from "./fix"

export function fixObject<T>(node: NodeObject<T>, obj: any, defalt?: T): Fixed<T> {
  const err: Errors<T> = {}
  const fixed: Partial<T> = {}

  const objectErr = node.validate(obj)
  if (objectErr) return optionalCheck(obj, defalt, {
    err: objectErr,
    fixed: defalt
  })

  objectForEach(node.schema, (key, schemaVal) => {
    const defaltVal = defalt?.[key]
    const val = obj?.[key]
    const res = fix(schemaVal, val, defaltVal)
    if (res.err === undefined) {
      fixed[key] = val
    } else {
      err[key] = res.err
      if (res.fixed !== undefined) fixed[key] = res.fixed
    }
  })

  return {
    fixed: fixed as T,
    err: Object.keys(err).length === 0 ? undefined : err
  }
}

export function object<T>(schema: Schema<T>, validate?: Validate<T>): SchemaNode<T> {
  return {
    type: 'object',
    validate: val => {
      if (val === null) return 'is null'
      if (Array.isArray(val)) return 'is array'
      if (typeof val !== 'object') return `is ${typeof val}`
      if (validate) return validate(val)
    },
    schema: schema
  }
}
