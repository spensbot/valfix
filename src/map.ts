import { objectForEach, optionalCheck, isObject } from "./util"
import { NodeObject, Fixed, Errors, Schema, Validate, SchemaNode, NodeMap } from "./types"
import { fix } from "./fix"

export function fixMap<T>(node: NodeMap<T>, map: any, defalt?: T): Fixed<T> {
  const mapErr = node.validate(map)
  if (mapErr) return {
    err: mapErr,
    fixed: {} as T
  }

  const err: Errors<T> = {}
  const fixed: Partial<T> = {}

  objectForEach(map, (key, val) => {
    const res = node.fixEntry(val)
    if (res.err === undefined) {
      fixed[key] = val
    } else {
      err[key] = res.err
    }
  })

  return {
    fixed: fixed as T,
    err: Object.keys(err).length === 0 ? undefined : err
  }
}

export function map<T>(entryNode: SchemaNode<T>, validateMap?: Validate<{[key: string]: T}>): SchemaNode<{[key: string]: T}> {
  return {
    type: 'map',
    validate: map => {
      if (!isObject(map)) return 'is not an object'
      if (validateMap) return validateMap(map)
    },
    fixEntry: entry => {
      return fix(entryNode, entry)
    }
  }
}
