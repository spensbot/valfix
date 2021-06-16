import { NodePrimitive, Fixed, Validate, SchemaNode } from './types'
import { optionalCheck } from './util'

export function fixPrimitive<T>(node: NodePrimitive<T>, val: any): Fixed<T> {
  const err = node.validate(val)
  if (err) {
    return optionalCheck(val, node.defalt, {
      err: err,
      fixed: node.defalt
    })
  } else {
    return {
      fixed: val
    }
  }
}

export function string(validate?: Validate<string>): NodePrimitive<string> {
  return {
    type: 'primitive',
    validate: val => {
      if (typeof val !== 'string') return 'is not a string'
      if (validate) return validate(val)
    }
  }
}

export function number(validate?: Validate<number>): NodePrimitive<number> {
  return {
    type: 'primitive',
    validate: val => {
      if (isNaN(val)) return 'not a number'
      if (validate) return validate(val)
    }
  }
}

export function boolean(validate?: Validate<boolean>): NodePrimitive<boolean> {
  return {
    type: 'primitive',
    validate: val => {
      if (typeof val !== 'boolean') return 'not a boolean'
      if (validate) return validate(val)
    }
  }
}

export function equal<T>(comparator: T): NodePrimitive<T> {
  return {
    type: 'primitive',
    validate: val => {
      if (val !== comparator) return `does not equal ${comparator}`
    }
  }
}
