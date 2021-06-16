import { Fixed, SchemaNode } from "./types"
import { fix } from "./fix"

export function makeFix<T>(node: SchemaNode<T>, makeDefault: () => T): (val: any) => Fixed<T> {
  return val => fix(node, val, makeDefault())
}
