import { fixPrimitive, string, number, boolean, equal } from '../primitive'
import { NodePrimitive } from '../types'

const testValues: any[] = ["hello", "", 5, 0, true, false, [], {}, null, undefined, NaN, () => {}]

function testMultiple<T>(name: string, nodeGetter: () => NodePrimitive<T>, validTestValues: any[]) {
  testValues.forEach(testVal => {
    testFixPrimitive(name, nodeGetter, testVal, validTestValues.findIndex(validVal => testVal === validVal) !== -1)
  })
}

function testFixPrimitive<T>(name: string, nodeGetter: () => NodePrimitive<T> , value: any, isValid: boolean) {
  test(`fixPrimitive(${name}(), ${value})`, () => {
    const res = fixPrimitive(nodeGetter(), value)
    isValid ? expect(res.err).toBe(undefined) : expect(res.err).toBeTruthy()
    expect(res.fixed).toBe(isValid ? value : undefined)
  })
}

testMultiple("string", string, ["hello", ""])
testMultiple("number", number, [5, 0])
testMultiple("boolean", boolean, [true, false])

// test(`fixPrimitive(string(), "hello")`, () => {
//   const res = fixPrimitive(string(), "hello")
//   expect(res.err).toBe(undefined)
//   expect(res.fixed).toBe("hello")
// })

// test(`fixPrimitive(string(), 5)`, () => {
//   const res = fixPrimitive(string(), 5)
//   expect(res.err).toBeTruthy()
//   expect(res.fixed).toBe(undefined)
// })

// test(`fixPrimitive(string(), true)`, () => {
//   const res = fixPrimitive(string(), true)
//   expect(res.err).toBeTruthy()
//   expect(res.fixed).toBe(undefined)
// })

// test(`fixPrimitive(number(), 1)`, () => {
//   const res = fixPrimitive(number(), 1)
//   expect(res.err).toBe(undefined)
//   expect(res.fixed).toBe(1)
// })

// test(`fixPrimitive(boolean(), true)`, () => {
//   const res = fixPrimitive(boolean(), 1)
//   expect(res.err).toBe(undefined)
//   expect(res.fixed).toBe(1)
// })