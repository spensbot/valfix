import { NodeUnion, SchemaNode } from './types'
import { equal } from './primitive'
import { fix } from './fix'
import { isObject } from './util'

export function fixUnion<T>(node: NodeUnion<T>, val: any, defalt: any) {
  for (const subNode of node.nodes) {
    const res = fix(subNode, val, defalt)
    if (res.err === undefined) {
      return {
        fixed: val
      }
    }
  }

  return {
    err: 'does not match any union type',
    fixed: defalt
  }
}

export function union<T>(...validateList: (SchemaNode<any> | any)[]): SchemaNode<T> {
  return {
    type: 'union',
    nodes: validateList.map<SchemaNode<T>>(val => {
      if (isObject(val)) {
        if (val.validate === undefined) {
          console.error(`Bad value passed to union(). Primitive or SchemaNode required`)
        } else {
          return val
        }
      } else {
        return equal(val)
      }
    })
  }
}