const { log2, exp, sin } = require('./mathFuncs')


test('log2 of 8 is 3', () => {
  expect(log2(8)).toBe(3)
})

test('log2 of 1 is 0', () => {
  expect(log2(1)).toBe(0)
})

test('log2 of 1024 is 10', () => {
  expect(log2(1024)).toBe(10)
})

test('log2 of 0 returns -Infinity', () => {
  expect(log2(0)).toBe(-Infinity)
})

test('log2 of negative number returns NaN', () => {
  expect(log2(-4)).toBeNaN()
})






test('exp of 1 is e', () => {
  expect(exp(1)).toBeCloseTo(Math.E)
})

test('exp of 0 is 1', () => {
  expect(exp(0)).toBe(1)
})

test('exp of 2 is e^2', () => {
  expect(exp(2)).toBeCloseTo(Math.E ** 2)
})

test('exp of -1 is 1/e', () => {
  expect(exp(-1)).toBeCloseTo(1 / Math.E)
})

test('exp of large number returns Infinity', () => {
  expect(exp(1000)).toBe(Infinity)
})




test('sin of 0 is 0', () => {
  expect(sin(0)).toBe(0)
})

test('sin of PI/2 is 1', () => {
  expect(sin(Math.PI / 2)).toBe(1)
})

test('sin of PI is 0', () => {
  expect(sin(Math.PI)).toBeCloseTo(0)
})

test('sin of 3*PI/2 is -1', () => {
  expect(sin(3 * Math.PI / 2)).toBe(-1)
})

test('sin of negative angle', () => {
  expect(sin(-Math.PI / 2)).toBe(-1)
})
