export type MaybeError = string | void
export type Validate<T> = (val: any) => MaybeError
export interface NodeBase<T> { validate: Validate<T> }
export interface NodePrimitive<T> extends NodeBase<T> { type: 'primitive', defalt?: T }
export interface NodeArray<T> extends NodeBase<T> { type: 'array', fixItem: (val: any, defalt?: any) => Fixed<any> }
export interface NodeObject<T> extends NodeBase<T> { type: 'object', schema: Schema<T> }
export interface NodeUnion<T> { type: 'union', nodes: SchemaNode<T>[] }
export interface NodeMap<T> extends NodeBase<T> { type: 'map', fixEntry: (val: any, defalt?: any) => Fixed<any> }
export type SchemaNode<T> = NodePrimitive<T> | NodeArray<T> | NodeObject<T> | NodeUnion<T> | NodeMap<T>
export type Fixed<T> = { err?: Errors<T>, fixed?: T }

export type Errors<T> = {
  [Key in keyof T]+?: Errors<T[Key]>
} | string

export type Schema<T> = {
  [Key in keyof T]-?: SchemaNode<Required<T>[Key]>
}
