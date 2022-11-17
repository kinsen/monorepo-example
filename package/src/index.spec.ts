import { plus } from './index'

it('should return the sum of two numbers', () => {
  expect(plus(1, 2)).toBe(3)
  expect(plus(2, 1)).toBe(3)
  expect(plus(2, 2)).toBe(4)
})