var convert = require('../lib/convert')

test('convertMinsToHrsMins(t)', function () {
  expect(convert.convertMinsToHrsMins(120)).toBe('2:00')
})

test('draw(n)', function () {
  expect(convert.draw('AA')).toBe('AA')
})

test('draw(n,n)', function () {
  expect(convert.draw('AA'), 4).toBe('AA')
})
