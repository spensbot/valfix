import { isArray } from "./util"
import { Fixed, Errors, Validate, SchemaNode, NodeArray } from "./types"
import { fix } from "./fix"


export function fixArray<T>(node: NodeArray<T>, array: any, defalt?: T): Fixed<T[]> {
  const arrayErr = node.validate(array)
  if (arrayErr) return {
    err: arrayErr,
    fixed: []
  }

  const err: Errors<T>[] = []
  const fixed: T[] = []

  array.forEach((item: any, i: number) => {
    const res = node.fixItem(item, defalt)
    if (res.err === undefined) {
      fixed.push(item)
    } else {
      err[i] = res.err
    }
  })

  return {
    fixed: fixed,
    err: err.length > 0 ? err : undefined
  }
}

export function array<T>(itemNode: SchemaNode<T>, validateArray?: Validate<T[]>): SchemaNode<T[]> {
  return {
    type: 'array',
    validate: array => {
      if (!isArray(array)) return 'is not an array'
      if (validateArray) return validateArray(array)
    },
    fixItem: item => {
      return fix(itemNode, item)
    }
  }
}
