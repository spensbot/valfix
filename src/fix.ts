import { Fixed, SchemaNode } from "./types"
import { fixPrimitive } from './primitive'
import { fixUnion } from './union'
import { fixArray } from './array'
import { fixObject } from './object'
import { fixMap } from './map'

export function fix<T>(node: SchemaNode<T>, val: any, defalt?: T): Fixed<T> {
  if (node === undefined) {
    console.error('validate.ts:237 -> node === undefined')
  }
  if (node.type === 'union') return fixUnion(node, val, defalt)
  if (node.type === 'primitive') return fixPrimitive(node, val)
  if (node.type === 'array') return fixArray(node, val, defalt?.[0])
  if (node.type === 'object') return fixObject(node, val, defalt)
  if (node.type === 'map') return fixMap(node, val, defalt['default'])
  return {}
}
